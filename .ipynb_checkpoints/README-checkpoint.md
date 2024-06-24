# Project3-Group3: Cardiovascular Disease in the United States 

![download](https://github.com/K-G-Witt/project3-group3/assets/70048005/62a35724-741b-46c3-a663-bba10843c8af)

# Incidence of Cardiovascular Disease in the United States by Age, Ethnicity, Gender, and Year:
The source data collected for this project was produced by the Centers for Disease Control and Prevention (CDC), Division for Heart Disease and Stroke Prevention. These datasets document rates and trends in cardiovascular disease (i.e., heart disease and stroke) mortality by US State, County (or county equivalent), age group (ages 35–64 years, ages 65 years and older), race/ethnicity (non-Hispanic American Indian/Alaska Native, non-Hispanic Asian/Pacific Islander, non-Hispanic Black, Hispanic, non-Hispanic White), and sex (women, men) from 1999 to 2019.

Cause of death is defined according to the underlying cause of death listed on the death certificate and classified according to the following International Classification of Disease, version 10 (ICD-10) codes:
1. Cardiovascular Disease Overall (CVD): ICD-10 codes I00-I99;
2. Heart disease: ICD-10 codes I00-I09, I11, I13, I20–I51;
3. Coronary heart disease (CHD): ICD-10 codes I20-I25;
4. Heart failure: ICD-10 code I50; and
5. Stroke: ICD‐10 codes I60-I69.

## Installation and Run Instructions:
### Graph Visualisations:
Before commencing, you may need to add the hvplot library to your python environnment:
1. Open **Gitbash** and activate your virtual environment
2. Type: **pip install hvplot**

### Mapping Visualisation:
To avoid the **index.html** being blocked by your computer's Cross-Origin Resource Sharing (CORS) policy, you will need to run the following steps before opening Google Chrome:
1. Open **Gitbash**  and activate your virtual environment
2. Type: **python -m http.server 8000**
3. In your web browser, navigate to: **http://localhost:8000**
4. Next, navigate through your directories within your web browser to the folder containing the **index.html** file
5. Double-click on the **index.html** file to launch the map in Google Chrome

## Usage Instructions:
This repo contains the following:
1. In the **Resources** subfolder, each year of data from 1999 to 2019 are saved as **.csv** files
2. The **project3-group3_ERD** provides the relationship between these **.csv** files

### Graph Visualisation:
4. **graph_visualisation.ipynb** is the script to recreate the graph visualisations

### Mapping Visualisation:
6. **mapping_visualisation.ipynb** is the script to recreate the **.csv** files called in the **index.html** script
7. **index.html** is the script to recreate the mapping visualisation in Google Chrome
8. **logic.js** is called by the **index.html** to support the mapping visualisation
9. **style.css** is called by the **index.html** to support the mapping visualisation
10. **us-states.json** is called by the **index.html** to define the boundaries of the US States
   

## Data Ethics Statement:
The CDC has made this data asset is publicly available to all without restrictions (public).


## Credits:
This code was compiled and written by Charles Morgan, Mahsa Hesampour, Riona Espedido, and Katrina Witt for Project 3 in the 2024 Data Analytics Boot Camp hosted by Monash University. 

## Additional credits are declared below:

### Reference material
Centers for Disease Control and Prevention, Division for Heart Disease and Stroke Prevention. Rates and Trends in Heart Disease and Stroke Mortality Among US Adults (35+) by County, Age Group, Race/Ethnicity, and Sex – 2000-2019: https://data.cdc.gov/Heart-Disease-Stroke-Prevention/Rates-and-Trends-in-Heart-Disease-and-Stroke-Morta/7b9s-s8ck/about_data (Accessed June 6 2024).



