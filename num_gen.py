import random
import pandas as pd

key = [9131,9340,9691,9770,7000,7974,7987,8319,8770,8815,8839,6232,6264,6261,7024,7389,7869,7898,8085,8349,8827,9165,9179,9589,9630,9685,9752,9755,9834,9893,9981,9993,9826,9827,9824]
mob = []
for i in key:
    for j in range(0,100000):
        while True:
            num_temp = str(i)+''.join([str(random.randint(0,9)) for x in range(0,6)])
            if num_temp not in mob:
                mob.append(num_temp)
                print(f'Key : {i} || iteration : {j}')
                break
            
df = pd.DataFrame(mob)

df.to_csv('num.csv',index=None)
