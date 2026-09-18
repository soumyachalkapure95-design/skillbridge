import pandas as pd

df = pd.read_csv("jobs.csv")

print("Shape:", df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 jobs:")
print(df.head())

print("\nMissing values:")
print(df.isnull().sum())

print("\nCompanies:")
print(df["company"].value_counts().head(10))

print("\nJob titles:")
print(df["title"].value_counts().head(10))