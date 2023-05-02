ML Model for News Category Prediction
This is an ML model that predicts the category of news articles based on their text content. The model has been built using Apache Spark and Python 
and it has been saved with the name 'ML_Model'.
Prerequisites
To use this ML model, you need to have the following installed on your system:

Apache Spark 3.0 or higher
Python 3.7 or higher
MLflow 1.20 or higher

Steps to use the model
1. Clone or download the ML_model folder to your local system.
2. Install the required python modules. You can use pip to install them.
3. Start a PySpark session in your terminal by running the following command:pyspark
4. In the PySpark shell, load the saved model by running the following commands:
from pyspark.ml import PipelineModel
model_path = "/path/to/ML_model"
loaded_model = PipelineModel.load(model_path)

5. If you have the data in the form of dataframes, then import the data.
6. Convert the pandas DataFrame to a PySpark DataFrame:
from pyspark.sql.functions import *
from pyspark.sql.types import *
data_spark = spark.createDataFrame(data.astype(str))

7. Make predictions on your data by running the following command:
predictions = loaded_model.transform(data_spark)
8. You can then access the predicted categories by selecting the prediction column from the predictions PySpark DataFrame:
preds = predictions.select("prediction").toPandas()
9. This will give you a column with all of the numeric labels. Now, you have to convert these to Label categories that are Strings.
10. Store this label dictionary:
label_dict = {
    0.0: 'POLITICS',
    1.0: 'ENTERTAINMENT',
    2.0: 'WORLD NEWS',
    3.0: 'QUEER VOICES',
    4.0: 'COMEDY',
    5.0: 'BLACK VOICES',
    6.0: 'SPORTS',
    13.0: 'MEDIA',
    8.0: 'WOMEN',
    10.0: 'CRIME',
    11.0: 'BUSINESS',
    12.0: 'LATINO VOICES',
    13.0: 'IMPACT',
    14.0: 'RELIGION',
    15.0: 'TRAVEL',
    16.0: 'STYLE',
    18.0: 'PARENTS',
    19.0: 'TECH',
    20.0: 'HEALTHY LIVING',
    22.0: 'EDUCATION',
    23.0: 'TASTE',
    25.0: 'COLLEGE',
    17.0: 'GREEN',
    9.0: 'WEIRD NEWS',
    24.0: 'ARTS $ CULTURE',
    21.0: 'SCIENCE',
    7.0: 'MEDIA'
}
11. Now, run this command:
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

# define a user-defined function to map category_number to category name
map_label_udf = udf(lambda x: label_dict.get(x), StringType())

# add a new column 'predicted_category' by mapping the category_number column to category name
preds = preds.withColumn('predicted_category', map_label_udf(preds.category_number))

# select only the predicted_category column
predicted_categories = preds.select('predicted_category')

12. Your predicted_categories will contain the string categories.
