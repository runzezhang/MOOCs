# 10.2 Write a program to read through the mbox-short.txt and figure out the distribution by hour of the day for each of the messages. You can pull the hour out from the 'From ' line by finding the time and then splitting the string a second time using a colon.
# From stephen.marquard@uct.ac.za Sat Jan  5 09:14:16 2008
# Once you have accumulated the counts for each hour, print out the counts, sorted by hour as shown below.

name = input("Enter file:")
if len(name) < 1 : name = "mbox-short.txt"
handle = open(name)
dic = dict()
for line in handle:
    line = line.rstrip()
    wds = line.split()
    if len(wds) < 6 or wds[0] != 'From':
        continue
    p = wds[5].split(':')
    k = p[0]
    dic[k] = dic.get(k,0) + 1
tmp =list()
for k,v in dic.items():
    new = (k,v)
    tmp.append(new)
tmp = sorted(tmp)
for i in tmp:
    print(i[0],i[1])