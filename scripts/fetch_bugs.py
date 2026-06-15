import json, urllib.request, sys

sys.stdout.reconfigure(encoding='utf-8')

url = 'https://api.github.com/repos/Achilng/floral-notepaper/issues?state=open&labels=bug&per_page=100'
req = urllib.request.Request(url, headers={'User-Agent': 'CodeWhale/1.0'})
resp = urllib.request.urlopen(req)
data = json.loads(resp.read().decode('utf-8'))

print(json.dumps([{
    'number': i['number'],
    'title': i['title'],
    'state': i['state'],
    'labels': [l['name'] for l in i.get('labels', [])],
    'author': i['user']['login'],
    'created': i['created_at'],
    'updated': i['updated_at'],
    'comments': i['comments'],
    'url': i['html_url'],
    'body': i.get('body', '')[:500]
} for i in data], ensure_ascii=False, indent=2))
