import requests # request img from web
import shutil # save img locally

import pandas as pd

data = pd.read_excel('data.xlsx')

for i in range(0,2528):
    url = data['url'][i]
    res = requests.get(url, stream = True)

    if res.status_code == 200:
        with open(f'images/{data["mobile"][i]}.jpg','wb') as f:
            shutil.copyfileobj(res.raw, f)
        print('Image sucessfully Downloaded: ',f'{data["mobile"][i]}.jpg')
    else:
        print('Image Couldn\'t be retrieved')