import json, urllib.request, sys
sys.stdout.reconfigure(encoding='utf-8')

issues = []
for num in [299, 297, 294, 292, 290, 284, 224, 158, 129, 118, 117, 107, 51, 38]:
    url = f'https://api.github.com/repos/Achilng/floral-notepaper/issues/{num}'
    req = urllib.request.Request(url, headers={'User-Agent': 'CodeWhale/1.0'})
    resp = urllib.request.urlopen(req)
    i = json.loads(resp.read().decode('utf-8'))
    issues.append({
        'number': i['number'],
        'title': i['title'],
        'labels': [l['name'] for l in i.get('labels', [])],
        'author': i['user']['login'],
        'created': i['created_at'],
        'updated': i['updated_at'],
        'comments': i['comments'],
        'url': i['html_url'],
        'body': i.get('body', '')
    })

# sorted by severity (P0 first), then recency
print(json.dumps(issues, ensure_ascii=False, indent=2))
