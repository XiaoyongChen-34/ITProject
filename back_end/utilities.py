import os
import re

def remove_empty_lines(input_code):
    # Split the code into lines
    lines = input_code.splitlines()
    
    # Filter out empty lines and join them back with newline characters
    non_empty_lines = [line for line in lines if line.strip() != ""]
    
    # Join the lines back into a single string
    cleaned_code = "\n".join(non_empty_lines)
    
    return cleaned_code

def remove_triple_quoted_comments(input_code):
    # Use regex to find and remove all text enclosed in triple quotes
    cleaned_code = re.sub(r'""".*?"""', '', input_code, flags=re.DOTALL)
    cleaned_code = re.sub(r"'''.*?'''", '', cleaned_code, flags=re.DOTALL)
    
    # Optionally, remove any extra empty lines that may result from the removal
    cleaned_code = "\n".join([line for line in cleaned_code.splitlines() if line.strip() != ""])
    
    return cleaned_code

def remove_single_line_comments(input_code):
    cleaned_code = re.sub('#.*', '', input_code)
    # Optionally remove any trailing whitespace
    cleaned_code = "\n".join([line.rstrip() for line in cleaned_code.splitlines() if line.strip() != ""])
    return cleaned_code

def generate_function_call(function_file_name, input_file, output_file_name):
    
    with open(function_file_name, 'r') as function_file:
        function_code = function_file.read()
    
    # Extract the function name
    function_name = re.findall(r'def (\w+)\(', function_code[0])

    # Read the input parameters from the file
    with open(input_file, 'r') as input_file:
        input_parameters = input_file.read().strip()

    # Construct the function call string
    function_call = f"{function_name}({input_parameters})"

    # Write the function call to the output file
    with open(output_file_name, 'w') as output_file:
        output_file.write(function_call)

'''
# Splits example usage into the input parameters and expected output and returns input parameters
def process_example_usage(example_usage):
    # Split example usage into lines
    lines = example_usage.splitlines()
    
    # Separate the last line as expected output
    if lines:
        expected_output = lines[-1].strip()
        input_parameters = "\n".join(lines[:-1]).strip()
    else:
        expected_output = ''
        input_parameters = ''
    
    # Write input parameters to file
    with open(INPUT_FILE, 'w') as input_file:
        input_file.write(input_parameters)
    
    # Write expected output to file
    with open(OUTPUT_FILE, 'w') as output_file:
        output_file.write(expected_output)
'''
        
def delete_file_if_exists(file_path):
    #Delete the file if it exists.
    if os.path.exists(file_path):
        print(f"Deleting file: {file_path}")  # Debug statement
        os.remove(file_path)
    else:
        print(f"File not found: {file_path}")  # Debug statement

# For comparing user output with expected output
def compare_files(file1_path, file2_path):
    with open(file1_path, 'r') as file1, open(file2_path, 'r') as file2:
        file1_content = file1.read()
        file2_content = file2.read()
        
        # Compare the contents
        return file1_content == file2_content