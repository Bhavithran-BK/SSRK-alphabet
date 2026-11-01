import json
import re

def normalize_path(path_str):
    if 'A' in path_str:
        # For dot or arc
        return 'M 30 25 A 5 5 0 1 1 30 35 A 5 5 0 1 1 30 25'
    
    tokens = re.findall(r'[A-Za-z]|[-+]?\d*\.?\d+', path_str)
    coords = []
    i = 0
    while i < len(tokens):
        t = tokens[i]
        if not t.isalpha():
            coords.append(float(t))
        i += 1
    
    pts = [(coords[j], coords[j+1]) for j in range(0, len(coords)-1, 2)]
    if not pts:
        return path_str
    
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    w = max_x - min_x
    h = max_y - min_y
    cx = (min_x + max_x) / 2
    cy = (min_y + max_y) / 2
    scale = 36.0 / max(w, h, 18.0)
    
    out = []
    coord_idx = 0
    for t in tokens:
        if t.isalpha():
            out.append(t)
        else:
            val = float(t)
            is_x = (coord_idx % 2 == 0)
            if is_x:
                nv = 30 + (val - cx) * scale
            else:
                nv = 30 + (val - cy) * scale
            out.append(f'{nv:.1f}')
            coord_idx += 1
    return ' '.join(out)

def get_centroid(path_str):
    coords = [float(x) for x in re.findall(r'[-+]?\d*\.?\d+', path_str)]
    xs = coords[0::2]
    ys = coords[1::2]
    if not xs or not ys:
        return 100, 100
    return round(sum(xs)/len(xs)), round(sum(ys)/len(ys))

def get_start_point(path_str):
    coords = [float(x) for x in re.findall(r'[-+]?\d*\.?\d+', path_str)]
    if len(coords) >= 2:
        return [round(coords[0]), round(coords[1])]
    return [100, 100]

# ==================== UPPERCASE (A - Z) ====================
# Reference: English Alphabet – Stroke Order Reference (media_1793471670532_b5972baa.jpg)
uppercase_raw = [
    {
        'char': 'A',
        'strokes': [
            {'name': 'Crossing Line', 'path': 'M 100 35 L 45 165'},
            {'name': 'Crossing Line', 'path': 'M 100 35 L 155 165'},
            {'name': 'Sleeping Line', 'path': 'M 65 118 L 135 118'},
        ]
    },
    {
        'char': 'B',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 60 35 L 60 165'},
            {'name': 'Curve', 'path': 'M 60 35 L 105 35 C 145 35 145 98 105 98 L 60 98'},
            {'name': 'Curve', 'path': 'M 60 98 L 110 98 C 150 98 150 165 110 165 L 60 165'},
        ]
    },
    {
        'char': 'C',
        'strokes': [
            {'name': 'Curve', 'path': 'M 150 62 C 140 35 60 35 60 100 C 60 165 140 165 150 138'},
        ]
    },
    {
        'char': 'D',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 60 35 L 60 165'},
            {'name': 'Curve', 'path': 'M 60 35 L 95 35 C 155 35 155 165 95 165 L 60 165'},
        ]
    },
    {
        'char': 'E',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 60 35 L 60 165'},
            {'name': 'Sleeping Line', 'path': 'M 60 35 L 145 35'},
            {'name': 'Sleeping Line', 'path': 'M 60 100 L 128 100'},
            {'name': 'Sleeping Line', 'path': 'M 60 165 L 145 165'},
        ]
    },
    {
        'char': 'F',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 60 35 L 60 165'},
            {'name': 'Sleeping Line', 'path': 'M 60 35 L 145 35'},
            {'name': 'Sleeping Line', 'path': 'M 60 100 L 128 100'},
        ]
    },
    {
        'char': 'G',
        'strokes': [
            {'name': 'Curve', 'path': 'M 150 62 C 140 35 60 35 60 100 C 60 165 145 165 145 112'},
            {'name': 'Sleeping Line', 'path': 'M 145 112 L 105 112'},
        ]
    },
    {
        'char': 'H',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 60 35 L 60 165'},
            {'name': 'Sleeping Line', 'path': 'M 60 100 L 140 100'},
            {'name': 'Standing Line', 'path': 'M 140 35 L 140 165'},
        ]
    },
    {
        'char': 'I',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 100 45 L 100 155'},
            {'name': 'Sleeping Line', 'path': 'M 65 45 L 135 45'},
            {'name': 'Sleeping Line', 'path': 'M 65 155 L 135 155'},
        ]
    },
    {
        'char': 'J',
        'strokes': [
            {'name': 'Curve', 'path': 'M 135 35 L 135 130 C 135 165 75 165 65 135'},
        ]
    },
    {
        'char': 'K',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 65 35 L 65 165'},
            {'name': 'Crossing Line', 'path': 'M 142 45 L 65 105'},
            {'name': 'Crossing Line', 'path': 'M 65 105 L 145 165'},
        ]
    },
    {
        'char': 'L',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 65 35 L 65 165'},
            {'name': 'Sleeping Line', 'path': 'M 65 165 L 142 165'},
        ]
    },
    {
        'char': 'M',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 50 35 L 50 165'},
            {'name': 'Crossing Line', 'path': 'M 50 35 L 100 135'},
            {'name': 'Crossing Line', 'path': 'M 100 135 L 150 35'},
            {'name': 'Standing Line', 'path': 'M 150 35 L 150 165'},
        ]
    },
    {
        'char': 'N',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 58 35 L 58 165'},
            {'name': 'Crossing Line', 'path': 'M 58 35 L 142 165'},
            {'name': 'Standing Line', 'path': 'M 142 35 L 142 165'},
        ]
    },
    {
        'char': 'O',
        'strokes': [
            {'name': 'Curve', 'path': 'M 100 35 C 55 35 55 165 100 165 C 145 165 145 35 100 35'},
        ]
    },
    {
        'char': 'P',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 60 35 L 60 165'},
            {'name': 'Curve', 'path': 'M 60 35 L 105 35 C 145 35 145 105 105 105 L 60 105'},
        ]
    },
    {
        'char': 'Q',
        'strokes': [
            {'name': 'Curve', 'path': 'M 100 35 C 55 35 55 165 100 165 C 145 165 145 35 100 35'},
            {'name': 'Crossing Line', 'path': 'M 115 132 L 155 170'},
        ]
    },
    {
        'char': 'R',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 60 35 L 60 165'},
            {'name': 'Curve', 'path': 'M 60 35 L 105 35 C 145 35 145 105 105 105 L 60 105'},
            {'name': 'Crossing Line', 'path': 'M 100 105 L 145 165'},
        ]
    },
    {
        'char': 'S',
        'strokes': [
            {'name': 'Curve', 'path': 'M 142 62 C 130 35 70 35 70 72 C 70 108 135 102 135 138 C 135 168 65 168 58 138'},
        ]
    },
    {
        'char': 'T',
        'strokes': [
            {'name': 'Sleeping Line', 'path': 'M 50 38 L 150 38'},
            {'name': 'Standing Line', 'path': 'M 100 38 L 100 165'},
        ]
    },
    {
        'char': 'U',
        'strokes': [
            {'name': 'Curve', 'path': 'M 65 35 L 65 125 C 65 168 135 168 135 125 L 135 35'},
        ]
    },
    {
        'char': 'V',
        'strokes': [
            {'name': 'Crossing Line', 'path': 'M 55 35 L 100 165'},
            {'name': 'Crossing Line', 'path': 'M 100 165 L 145 35'},
        ]
    },
    {
        'char': 'W',
        'strokes': [
            {'name': 'Crossing Line', 'path': 'M 42 35 L 68 165'},
            {'name': 'Crossing Line', 'path': 'M 68 165 L 100 68'},
            {'name': 'Crossing Line', 'path': 'M 100 68 L 132 165'},
            {'name': 'Crossing Line', 'path': 'M 132 165 L 158 35'},
        ]
    },
    {
        'char': 'X',
        'strokes': [
            {'name': 'Crossing Line', 'path': 'M 55 35 L 145 165'},
            {'name': 'Crossing Line', 'path': 'M 145 35 L 55 165'},
        ]
    },
    {
        'char': 'Y',
        'strokes': [
            {'name': 'Crossing Line', 'path': 'M 55 35 L 100 102'},
            {'name': 'Crossing Line', 'path': 'M 145 35 L 100 102'},
            {'name': 'Standing Line', 'path': 'M 100 102 L 100 165'},
        ]
    },
    {
        'char': 'Z',
        'strokes': [
            {'name': 'Sleeping Line', 'path': 'M 55 38 L 145 38'},
            {'name': 'Crossing Line', 'path': 'M 145 38 L 55 165'},
            {'name': 'Sleeping Line', 'path': 'M 55 165 L 145 165'},
        ]
    },
]

# ==================== LOWERCASE (a - z) ====================
lowercase_raw = [
    {
        'char': 'a',
        'strokes': [
            {'name': 'Curve', 'path': 'M 118 108 C 118 72 52 72 52 108 C 52 144 118 144 118 108'},
            {'name': 'Standing Line', 'path': 'M 118 72 L 118 148'},
        ]
    },
    {
        'char': 'b',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 65 35 L 65 148'},
            {'name': 'Curve', 'path': 'M 65 80 C 122 75 122 148 65 148'},
        ]
    },
    {
        'char': 'c',
        'strokes': [
            {'name': 'Curve', 'path': 'M 130 85 C 60 68 40 148 130 148'},
        ]
    },
    {
        'char': 'd',
        'strokes': [
            {'name': 'Curve', 'path': 'M 118 80 C 60 75 60 148 118 148'},
            {'name': 'Standing Line', 'path': 'M 118 35 L 118 148'},
        ]
    },
    {
        'char': 'e',
        'strokes': [
            {'name': 'Sleeping Line', 'path': 'M 55 108 L 128 108'},
            {'name': 'Curve', 'path': 'M 128 108 C 128 68 52 68 52 108 C 52 148 125 148 130 132'},
        ]
    },
    {
        'char': 'f',
        'strokes': [
            {'name': 'Curve', 'path': 'M 122 45 C 112 30 82 30 82 55 L 82 152'},
            {'name': 'Sleeping Line', 'path': 'M 55 85 L 110 85'},
        ]
    },
    {
        'char': 'g',
        'strokes': [
            {'name': 'Curve', 'path': 'M 118 95 C 118 68 52 68 52 95 C 52 124 118 124 118 95'},
            {'name': 'Standing Line', 'path': 'M 118 72 L 118 155 C 118 185 68 185 55 168'},
        ]
    },
    {
        'char': 'h',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 62 35 L 62 148'},
            {'name': 'Curve', 'path': 'M 62 95 C 62 72 135 72 135 98 L 135 148'},
        ]
    },
    {
        'char': 'i',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 100 80 L 100 148'},
            {'name': 'Dot', 'path': 'M 100 48 A 4 4 0 1 1 100 56 A 4 4 0 1 1 100 48'},
        ]
    },
    {
        'char': 'j',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 115 80 L 115 155 C 115 185 75 185 65 168'},
            {'name': 'Dot', 'path': 'M 115 48 A 4 4 0 1 1 115 56 A 4 4 0 1 1 115 48'},
        ]
    },
    {
        'char': 'k',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 65 35 L 65 148'},
            {'name': 'Crossing Line', 'path': 'M 128 80 L 65 116'},
            {'name': 'Crossing Line', 'path': 'M 65 116 L 132 148'},
        ]
    },
    {
        'char': 'l',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 100 35 L 100 148'},
        ]
    },
    {
        'char': 'm',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 45 80 L 45 148'},
            {'name': 'Curve', 'path': 'M 45 95 C 45 74 95 74 95 95 L 95 148'},
            {'name': 'Curve', 'path': 'M 95 95 C 95 74 145 74 145 95 L 145 148'},
        ]
    },
    {
        'char': 'n',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 60 80 L 60 148'},
            {'name': 'Curve', 'path': 'M 60 95 C 60 74 135 74 135 98 L 135 148'},
        ]
    },
    {
        'char': 'o',
        'strokes': [
            {'name': 'Curve', 'path': 'M 100 68 C 62 68 62 148 100 148 C 138 148 138 68 100 68'},
        ]
    },
    {
        'char': 'p',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 65 72 L 65 185'},
            {'name': 'Curve', 'path': 'M 65 78 C 122 74 122 148 65 148'},
        ]
    },
    {
        'char': 'q',
        'strokes': [
            {'name': 'Curve', 'path': 'M 118 80 C 60 75 60 148 118 148'},
            {'name': 'Standing Line', 'path': 'M 118 72 L 118 185'},
        ]
    },
    {
        'char': 'r',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 72 80 L 72 148'},
            {'name': 'Curve', 'path': 'M 72 102 C 72 74 125 74 128 86'},
        ]
    },
    {
        'char': 's',
        'strokes': [
            {'name': 'Curve', 'path': 'M 125 88 C 120 70 75 70 75 92 C 75 120 125 115 125 138 C 125 155 75 155 68 140'},
        ]
    },
    {
        'char': 't',
        'strokes': [
            {'name': 'Standing Line', 'path': 'M 90 45 L 90 136 C 90 148 105 148 115 142'},
            {'name': 'Sleeping Line', 'path': 'M 62 82 L 118 82'},
        ]
    },
    {
        'char': 'u',
        'strokes': [
            {'name': 'Curve', 'path': 'M 65 80 L 65 125 C 65 148 120 148 120 125 L 120 80'},
            {'name': 'Standing Line', 'path': 'M 120 80 L 120 148'},
        ]
    },
    {
        'char': 'v',
        'strokes': [
            {'name': 'Crossing Line', 'path': 'M 60 80 L 98 148'},
            {'name': 'Crossing Line', 'path': 'M 98 148 L 136 80'},
        ]
    },
    {
        'char': 'w',
        'strokes': [
            {'name': 'Crossing Line', 'path': 'M 42 80 L 68 148'},
            {'name': 'Crossing Line', 'path': 'M 68 148 L 98 90'},
            {'name': 'Crossing Line', 'path': 'M 98 90 L 128 148'},
            {'name': 'Crossing Line', 'path': 'M 128 148 L 154 80'},
        ]
    },
    {
        'char': 'x',
        'strokes': [
            {'name': 'Crossing Line', 'path': 'M 62 80 L 135 148'},
            {'name': 'Crossing Line', 'path': 'M 135 80 L 62 148'},
        ]
    },
    {
        'char': 'y',
        'strokes': [
            {'name': 'Crossing Line', 'path': 'M 58 80 L 98 126'},
            {'name': 'Crossing Line', 'path': 'M 138 80 L 65 180'},
        ]
    },
    {
        'char': 'z',
        'strokes': [
            {'name': 'Sleeping Line', 'path': 'M 60 80 L 135 80'},
            {'name': 'Crossing Line', 'path': 'M 135 80 L 60 148'},
            {'name': 'Sleeping Line', 'path': 'M 60 148 L 135 148'},
        ]
    },
]

def build_ts(data, case_type, var_name):
    lines = [
        "import type { LetterData } from '../types';",
        "",
        f"export const {var_name}: LetterData[] = [",
    ]
    for item in data:
        char = item['char']
        strokes = []
        ref_paths = []
        for s_idx, s in enumerate(item['strokes']):
            s_num = s_idx + 1
            p_name = s['name']
            p_path = s['path']
            s_id = f"{char}-{s_num}-{p_name.lower().replace(' ', '-')}"
            cx, cy = get_centroid(p_path)
            sp = get_start_point(p_path)
            prev_p = normalize_path(p_path)
            ref_paths.append(p_path)
            
            strokes.append({
                'id': s_id,
                'patternName': p_name,
                'strokeNumber': s_num,
                'startPoint': sp,
                'targetX': cx,
                'targetY': cy,
                'targetPath': p_path,
                'previewPath': prev_p,
                'svgPath': prev_p,
            })
        
        full_ref = " ".join(ref_paths)
        letter_obj = {
            'character': char,
            'caseType': case_type,
            'referencePath': full_ref,
            'viewBox': '0 0 200 200',
            'strokes': strokes,
        }
        
        # Serialize to formatted TS
        lines.append(f"  // ===== LETTER {char} =====")
        lines.append("  {")
        lines.append(f"    character: '{char}',")
        lines.append(f"    caseType: '{case_type}',")
        lines.append(f"    referencePath: '{full_ref}',")
        lines.append("    viewBox: '0 0 200 200',")
        lines.append("    strokes: [")
        for st in strokes:
            lines.append("      {")
            lines.append(f"        id: '{st['id']}',")
            lines.append(f"        patternName: '{st['patternName']}',")
            lines.append(f"        strokeNumber: {st['strokeNumber']},")
            lines.append(f"        startPoint: [{st['startPoint'][0]}, {st['startPoint'][1]}],")
            lines.append(f"        targetX: {st['targetX']},")
            lines.append(f"        targetY: {st['targetY']},")
            lines.append(f"        targetPath: '{st['targetPath']}',")
            lines.append(f"        previewPath: '{st['previewPath']}',")
            lines.append(f"        svgPath: '{st['svgPath']}',")
            lines.append("      },")
        lines.append("    ],")
        lines.append("  },")
    lines.append("];\n")
    return "\n".join(lines)

with open('alphabet-learning/src/data/lowercase.ts', 'w', encoding='utf-8') as f:
    f.write(build_ts(lowercase_raw, 'lowercase', 'lowercaseLetters'))
print('Wrote lowercase.ts successfully!')

with open('alphabet-learning/src/data/uppercase.ts', 'w', encoding='utf-8') as f:
    f.write(build_ts(uppercase_raw, 'uppercase', 'uppercaseLetters'))
print('Wrote uppercase.ts successfully!')

