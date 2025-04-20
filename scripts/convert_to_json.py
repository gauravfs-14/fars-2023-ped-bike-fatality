import pandas as pd

def excel_to_json(input_file, output_file):
    # Load the Excel sheet named 'Narr_CrLev'
    df = pd.read_excel(input_file, sheet_name='data')

    # Convert the DataFrame to JSON format (records = list of dictionaries)
    df.to_json(output_file, orient='records', indent=4)

    print(f"Converted '{input_file}' (sheet: data) to '{output_file}' in JSON format.")

# Example usage:
# Replace 'your_file.xlsx' and 'output.json' with your actual filenames
excel_to_json('./src/data/FARS_PBTYPE_2016_2023.xlsx', './src/data/data.json')
