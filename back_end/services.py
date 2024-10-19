import google.generativeai as genai
import sys
from config import Config
from library import Library
from utilities import (
    remove_empty_lines, remove_triple_quoted_comments, 
    remove_single_line_comments, delete_file_if_exists
)


class CodeGenerationService:
    def __init__(self):
        self.api_key = 'AIzaSyC9tgJsZL4cW9KMsbW5u3_kSV2fsnhwF2c'
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.library = Library()  # Create an instance of Library

    def generate_code(self, clientTopic, clientContext, filename, filename1, filename2, output, statusFile):
        # create a file
        #file = open(filename, "w")

        # Limits the libraries imported to ones used in EODP
        formatted_libraries = self.library.format_libraries_for_prompt()

        #test_prompt = f"Generate a Python function relevant for the topic that's of at least 10 lines (NO EMPTY LINES OR ANYTHING THAT'S NOT THE CODE) (Just the code nothing else, no comments in code or empty lines but include indentations): {clientTopic}"
        context_prompt = f"""
            Generate a Python function relevant for the topic that's of at least 10 lines (NO EMPTY LINES OR ANYTHING THAT'S NOT THE CODE) (Just the code nothing else, no comments in code or empty lines but include indentations): {clientTopic}. 
            The code should be themed around the context of a {clientContext}. Function must not have input parameters that require files. Only use libraries in the following list:
            {formatted_libraries}. If the code requires nltk ensure the required nltk.download() are in the code ( ensure this line is in the code nltk.download("punkt_tab")). If the question is read or write csv do not use actual csv files just simulate it."""

        # Generate main code
        response = self.model.generate_content(context_prompt)
        print(response)
        print(response._result.candidates[0].finish_reason == 1)
        print("This is finish reason: ", response._result.candidates[0].finish_reason)

        # Check for safety ratings
        if not response:
            print("Invalid repsonse or not text attribute found.")
            return None

        # Not parts generated in response
        if response._result.candidates[0].finish_reason != 1:
            with open(statusFile, 'w', encoding='utf-8') as file:
                file.write("unsuccess")
            print("Safety ratings not found in this candidate.")
            return None
        else:
            with open(statusFile, 'w', encoding='utf-8') as file:
                file.write("success")

        code = response.text.strip().strip('"""').strip("'''").strip('```').strip('```python')
        code = remove_empty_lines(code)
        code = remove_triple_quoted_comments(code)
        code = remove_single_line_comments(code)

        # Generate example usage and expected output
        #example_prompt = f"Generate the inputs used for the following Python function and the expected output. Each input parameter and the expected output should be separated by newlines. The expected output should be at the end:\n\n{code}\n\nInputs and expected output:"
        #example_response = self.model.generate_content(example_prompt)
        #example_usage = example_response.text.strip().strip('"""').strip("'''").strip('```').strip('```python')
        #example_usage = remove_empty_lines(example_usage)

        # Generate function call 
        example_prompt = f"Generate a single line of code that demonstrates a function call for the following Python function. Use the following inputs: {code}. The function call should be in the format: function_name(param1, param2, ...) with actual values. Input parameters must be of this type: (primitives, lists, maps, dictionaries)."
        example_response = self.model.generate_content(example_prompt)
        example_usage = example_response.text.strip().strip('"""').strip("'''").strip('```').strip('```python')
        example_usage = remove_empty_lines(example_usage)

        # Generate function description
        description_prompt = f"Generate a brief description for the following Python function:\n\n{code}\n\nFunction description:"
        description_response = self.model.generate_content(description_prompt)
        function_description = description_response.text.strip()

        # Merge code with function call to form a runnable .py
        runnable_code = f"{code}\nresult = {example_usage}\nprint(result)"
        print(runnable_code)

        # Delete previous files if they exist
        delete_file_if_exists(filename)
        delete_file_if_exists(filename1)
        delete_file_if_exists(filename2)
        delete_file_if_exists(output)

        # Open files with UTF-8 encoding to avoid UnicodeEncodeError
        with open(filename, 'w', encoding='utf-8') as file:
            file.write(code)
        with open(filename1, 'w', encoding='utf-8') as file1:
            file1.write(example_usage)
        with open(filename2, 'w', encoding='utf-8') as file2:
            file2.write(function_description)

        # Initialize the Library class to get the global context
        library_instance = Library()
        global_context = library_instance.get_global_context()

        # Redirect stdout to capture output
        with open(output, 'w', encoding='utf-8') as file:
            original_stdout = sys.stdout
            sys.stdout = file
            try:
                exec(runnable_code, global_context)
            except Exception as e:
                print(f"Error executing code: {e}")
            finally:
                sys.stdout = original_stdout

        # Process the example output to create new files
        #process_example_usage(example_usage)