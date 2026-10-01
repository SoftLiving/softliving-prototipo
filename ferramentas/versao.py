#!/usr/bin/env python3
# Marca os arquivos de estilo e script de todas as páginas com a versão atual (?v=AAAAMMDDHHMM), para o navegador
# baixar de novo o que mudou em vez de usar a cópia antiga guardada (cache do GitHub Pages: até 10 minutos).
# Rodar antes de cada publicação:  python3 ferramentas/versao.py
import re, glob, os, datetime
raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
v = datetime.datetime.now().strftime('%Y%m%d%H%M')
padrao = re.compile(r'((?:src|href)="(?:\.\./)?assets/(?:js|css)/[^"?]+\.(?:js|css))(?:\?v=\d+)?"')
n = 0
for arq in glob.glob(os.path.join(raiz, '*.html')) + glob.glob(os.path.join(raiz, '*', '*.html')):
    s = open(arq, encoding='utf-8').read()
    novo, k = padrao.subn(lambda m: f'{m.group(1)}?v={v}"', s)
    if k:
        open(arq, 'w', encoding='utf-8').write(novo); n += k
print(f'versão {v}: {n} referências atualizadas')
