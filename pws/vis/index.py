import pandas as pd
import matplotlib.pyplot as plt


dfPrecafkomst = pd.read_csv("data/data.csv")
colms = ['afkomst','precentage']
dfPrecafkomstCol = dfPrecafkomst[colms]
dfPrecafkomstPerAfkomst = dfPrecafkomstCol.groupby("afkomst")
dfprecaGrouped = dfPrecafkomstPerAfkomst.sum().sort_values(by="precentage")
dfprecaGrouped.plot(kind="pie", y="precentage", autopct='%.2f', fontsize=10)
plt.show()