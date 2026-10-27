# -*- coding: utf-8 -*-
"""Build original-paper question images. Question view hides red answers and yellow highlights."""
import json
import os
import re
import fitz

ROOT = r"C:\AAA\study\hku\7215\往届试卷\Midterm_EXAM"
OUT = r"C:\AAA\study\hku\7215\midterm-quiz\papers"
RED = {16711680, 15597568}
ZOOM = 1.65

PAPERS = [
    ("2022", "IDAT 7215-2022.pdf", "28 November 2022 Quiz"),
    ("2024", "IDAT 7215-2024.pdf", "13 March 2024 Midterm"),
    ("2025", "IDAT 7215-MidTerm_Answer.pdf", "23 October 2025 Midterm"),
]


def lines_of(page):
    rows = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block["lines"]:
            text = "".join(span["text"] for span in line["spans"])
            if not text.strip():
                continue
            color = 0
            for span in line["spans"]:
                if span["text"].strip():
                    color = span["color"]
                    break
            rows.append({"bbox": fitz.Rect(line["bbox"]), "text": text, "color": color})
    rows.sort(key=lambda row: (row["bbox"].y0, row["bbox"].x0))
    return rows


def heading_of(text, color):
    if color in RED:
        return None
    flat = " ".join(text.split())
    if re.match(r"Question\s+\d+", flat, re.I):
        return flat
    if re.match(r"Question-\d+", flat, re.I):
        return flat
    if re.match(r"Part\s+[IVX0-9]+", flat, re.I):
        return flat
    match = re.match(r"(\d+\.\d+)\b", flat)
    if match:
        return match.group(1)
    match = re.match(r"(\d{1,2})\.\s+\S", flat)
    if match:
        return match.group(1)
    return None


def explain_for(paper, heading, red_text):
    blob = f"{heading} {red_text}".lower()
    notes = []
    if "list" in blob and "set" in blob:
        notes.append("课件表格：list 有序、可变，元素可以不同类型；set 用花括号，元素不重复，可变，课件称为无序。")
    if "sort" in blob or "[1, 6]" in red_text or "[7, 11]" in red_text or "[7,11]" in red_text:
        notes.append("先按 reverse=True 从大到小排序，再按切片 [start:stop:step] 取值。起点包含，终点不包含，负数步长从后往前取。")
    if "arange" in blob or "fancy" in blob or re.search(r"\[\d+ \d+\]", red_text):
        notes.append("NumPy 花式索引按 (row[i], col[i]) 成对取元素。arange 不含终点。打印用空格，卷面有时写成逗号，数值以卷面为准。")
    if "axis" in blob or "7 20 17 15" in red_text:
        notes.append("axis=0 是顺着每一列往下加，结果的个数等于列数。")
    if "hello, peter" in blob or "hello, peter" in red_text.lower():
        notes.append("调用时传入 Peter，默认参数 Joe 不会被用到。")
    if "john" in red_text.lower() and "iloc" in blob or red_text.strip() == "John":
        notes.append("iloc 按位置计数，从 0 开始。第 2 行、第 2 列是 John。列名是字符串，不参与 iloc。")
    if "ndim" in blob or "shape" in blob:
        notes.append("ndim 是维度个数，shape 是每一维的长度，size 是元素总数。")
    if "differential" in blob or "spring" in blob or "newton" in blob:
        notes.append("卷面按牛顿第二定律写合力。外力 r 等于质量的加速度项、阻尼项和弹簧项之和：r = M y'' + b y' + k y。图和式子以卷面红色解答为准。")
    if "block diagram" in blob or "summing point" in blob:
        notes.append("化简按这四步：把含 H2 的负反馈求和点移到含 H1 的正反馈外面；消去正反馈；再消去含 H2/G1 的回路；最后消去剩下的反馈，得到总传递函数。最终式子以解答图上的最后一步为准。")
    if "breadth-first" in blob or "depth-first" in blob:
        notes.append("同一棵树，从左到右。走完全部节点时，广度优先是 S, A, G, B, C, D, D, G, G, G；深度优先是 S, A, B, D, G, C, D, G, G, G。卷面同时接受在第一个目标停下：广度优先 S, A, G；深度优先 S, A, B, D, G。")
    if "forward chaining" in blob or "rule 3" in blob or red_text.strip().startswith("The system will return"):
        notes.append("正向链从已知事实出发。A 成立推出 X（Rule 3），X、B、E 成立推出 Y（Rule 1），Y、C 成立推出 W（Rule 4）。D 未知，Rule 2 不使用。")
    if "syntax" in blob and "logical" in blob:
        notes.append("第 1 讲的三类错误都算：语法错误、逻辑错误、运行时错误。")
    if "compiled or interpreted" in blob or "both compiled" in blob:
        notes.append("2024 卷面答案是 Python 既可以编译也可以解释。课件把 Python 列在解释器例子里。这道按卷面答案选 both。")
    if ".ipynb" in blob or "shift + enter" in blob or "shift+enter" in blob or "markdown cell" in blob or "what is a cell" in blob or "share a jupyter" in blob or "run a cell" in blob:
        notes.append("Lab 1：Shift+Enter 运行格子。代码格写代码，Markdown 格写文字。笔记本文件是 .ipynb。")
    if "class is a user-defined" in blob or heading in ("7",) and "class" in blob:
        notes.append("list、tuple、dict 是课件里的数据结构。class 是用户自己定义的类型，卷面不把它算作核心数据类型。")
    if "numerical python" in blob or "numpy stand" in blob or "purpose of the numpy" in blob or "mathematical calculations" in blob:
        notes.append("NumPy 是 Numerical Python，用来做数值计算。")
    if "panda" in blob and ("manipulate and analyze" in blob or "purpose of the panda" in blob):
        notes.append("Pandas 用来整理和分析表格数据。")
    if "traffic" in blob or "open-loop" in blob:
        notes.append("卷面把交通灯当作开环：按预先设好的时间切换，不根据路况反馈。这段属于控制系统，本地课件文件夹里还没有对应幻灯片，答案以卷面为准。")
    if "stochastic" in blob:
        notes.append("卷面定义：随机控制系统对输入的响应不可预测。确定系统则是可预测、可重复。")
    if "knowledge base" in blob or "rules and facts" in blob or "factual and heuristic" in blob:
        notes.append("专家系统的知识库存放事实和规则，包括启发式知识。第 3 讲和第 6 讲之前的专家系统课件都是这个划分。")
    if "k-means" in blob or "not a supervised" in blob:
        notes.append("K-Means 是无监督聚类。第 6 讲：它把样本排他地分进 k 个簇。Naive Bayes、SVM、决策树是有监督。")
    if "labeled data" in blob:
        notes.append("有监督用带标签的数据，无监督没有标签。第 6 讲补充：无监督适合从没有标签的数据里找结构，例如聚类和关联规则。")
    if "interpreter translates the entire" in blob or "interpreter executes faster" in blob:
        notes.append("编译器在运行前翻译全部源程序。解释器执行时逐行翻译，所以卷面认为它比编译器慢。")
    if "logical error" in blob:
        notes.append("逻辑错误会跑完，但不崩溃，结果是错的。")
    if "proper" in blob or ("denominator" in blob and "numerator" in blob):
        notes.append("分母多项式的阶数高于分子时，这个传递函数称为 proper。这句判断是对的。")
    if "what does the transfer function represent" in blob or "relationship between input and output" in blob:
        notes.append("传递函数表示输入和输出之间的关系，选 (a)。")
    if "left half" in blob or "poles" in blob:
        notes.append("卷面更正：极点都在左半平面时系统是稳定的，不是不稳定。")
    if "interference" in blob or "inference engine" in blob or "user interface" in blob:
        notes.append("和用户问答的是用户界面。推理机负责用知识库做推理。卷面把 Inference 印成了 Interference。")
    if "recommendation" in blob:
        notes.append("卷面把推荐系统当作无监督的典型例子。第 6 讲的关联规则和电影推荐也是无监督学习。")
    if "svm" in blob and "random forest" in blob:
        notes.append("SVM 和随机森林都是有监督算法。")
    if "linker" in blob:
        notes.append("链接器会处理目标文件和库，并解析引用。卷面这句“链接器不管库”是错的。")
    if "duplicate" in blob and "set" in blob:
        notes.append("set 不保留重复元素。")
    if "concatenate multiple strings" in blob or " + operator" in blob:
        notes.append("Lab 1 用 + 把多段字符串接成一句。")
    if "nested" in blob:
        notes.append("循环里面可以再放循环。")
    if "bibo" in blob:
        notes.append("卷面：BIBO 是 Bounded Input Bounded Output，有界输入、有界输出。")
    if "deterministic" in blob:
        notes.append("卷面：确定系统对输入的响应可预测、可重复。")
    if "branching factor" in blob:
        notes.append("搜索复杂度受分支因子 b 影响。卷面说“不受分支因子影响”是错的。")
    if "bidirectional" in blob:
        notes.append("双向搜索一边从起点、一边从目标同时搜，目标必须事先知道。")
    if "heuristic" in blob and "optimal" in blob:
        notes.append("启发式只是估计，本身不保证最优。A* 还要求 h 不高估真实剩余代价。")
    if "common sense" in blob:
        notes.append("专家系统的缺点就是没有常识。所以“能够复制常识”不是开发它的理由。")
    if "pyke" in blob or "python 3" in blob:
        notes.append("课件选用 PyKE，是因为它能在 Python 3 里运行。")
    if "f1" in blob or "precision and recall" in blob:
        notes.append("F1 同时看精确率和召回率：2PR/(P+R)。")
    if "logistic" in blob or "categorical values" in blob:
        notes.append("逻辑回归做分类，输出类别。课件用 sigmoid，阈值 0.5。线性回归才输出连续数值。")
    if "underfitting" in blob or "overfitting" in blob:
        notes.append("卷面说明交叉验证是为了减轻过拟合，不是欠拟合。K 折把数据分成 K 份轮流验证，再平均准确率。")
    if "classification and regression" in blob:
        notes.append("有监督既可以做回归（预测数值），也可以做分类（预测类别）。")
    if "low memory" in blob or "depth-first search (dfs)" in blob:
        notes.append("深度优先只保存一条路径和未扩展的兄弟节点，所以内存占用低。它不保证最短路径，也不保证一定找到解。")
    if "iterative deepening" in blob:
        notes.append("迭代加深把深度优先的低内存和广度优先的逐层推进合在一起。每提高一次深度上限，都会重做较浅层的工作。")
    if "15 % 2" in blob or heading == "5" and "1" in red_text:
        notes.append("% 是余数。15 除以 2 余 1。// 才是整除 7。")
    if "4**2" in blob or "4 ** 2" in blob or "**" in blob:
        notes.append("** 是乘方。4 的 2 次方是 16。")
    if "comment" in blob or flat_comment(blob):
        notes.append("Python 注释用 #。")
    if "break" in blob and "loop" in blob:
        notes.append("break 结束整个循环。continue 只跳过这一轮。")
    if "iloc" in blob:
        notes.append("iloc 按整数位置取，loc 按标签取。")
    if "range(5)" in blob:
        notes.append("range(5) 从 0 开始，不含 5，所以是 0 到 4。")
    if "linspace" in blob:
        notes.append("linspace(0, 1, 5) 含两端，分成 5 个数，步长是 0.25，所以是 [0, 0.25, 0.5, 0.75, 1]，选 (c)。(d) 的步长是 0.2，那是 6 个数才会出现的间隔。")
    if "type of program error" in blob or "all are possible types of error" in blob:
        notes.append("语法错误、逻辑错误、运行时错误都是程序错误，所以选 (d)。")
    if "only as good as the data" in blob:
        notes.append("专家系统的结论不会比给定的数据和规则更好。这句是对的。")
    if "simulates the decision-making" in blob:
        notes.append("专家系统就是用程序模拟人类专家做决策。这句是对的。")
    if "controller is responsible for comparing" in blob or "comparing the desired output" in blob:
        notes.append("控制器把期望输出和实际输出做比较，再决定怎么调。这句是对的。")
    if "[2, 7]" in red_text or "[2,7]" in red_text:
        notes.append("np.arange(16).reshape(4, 4) 是 4 行 4 列。row 取第 0、1 行，col 取第 2、3 列，按位置成对取出 2 和 7。")
    if "[4 5 6]" in red_text:
        notes.append("np.arange(3) 得到 0、1、2，每个加 4，打印是 [4 5 6]。")
    if red_text.strip().endswith("John"):
        notes.append("DataFrame 的 iloc[1, 1] 是第 2 行、第 2 列。这一列写的是姓名，所以打印 John。列名是字符串，iloc 不看列名。")
    if "size()" in blob:
        notes.append("数组元素个数用 size。ndim 是维数，shape 是每一维的长度。")
    if "show()" in blob:
        notes.append("Matplotlib 用 show() 显示图像。plot() 是画线。")
    if "head()" in blob:
        notes.append("df.head() 看表的开头几行。作业 2 用的是 head(6)。")
    if "modified after creation" in blob or "prefer using a list" in blob:
        notes.append("需要事后修改内容时用 list。只要唯一值用 set。固定不变、或一次返回多个值，用 tuple。")
    if "originally developed for unix" in blob or " dennis" in blob or "developed for unix" in blob:
        notes.append("第 1 讲：C 是 Dennis Ritchie 为 UNIX 写的。")
    if "basic data type" in blob and "int" in blob:
        notes.append("课件的基本类型有 int。list 是数据结构，不是这道题要的基本类型。")
    if "try-except" in blob or "error handling" in blob:
        notes.append("异常用 try-except。不处理的话，像除以零这种运行时错误会让程序崩溃。")
    if "mutable" in blob and "set" in blob:
        notes.append("课件表格里 set 可变，tuple 不可变。字符串也不能改其中某个字符。")
    if not notes:
        return ""
    # week 6 pointer when unsupervised is involved
    if any(word in blob for word in ("unsupervised", "k-means", "recommendation", "clustering")):
        notes.append("第 6 讲（reading week 前新课件）把无监督分成聚类和关联规则：K-Means 是排他聚类；Apriori 用 support、confidence、lift 找一起出现的物品。")
    # de-duplicate while keeping order
    seen = set()
    unique = []
    for note in notes:
        if note not in seen:
            seen.add(note)
            unique.append(note)
    return "\n".join(unique)


def flat_comment(blob):
    return "denote a comment" in blob or "how do you denote a comment" in blob


def tidy_answer(question):
    heading = question["heading"]
    text = " ".join(question["answerText"].split())
    if heading.startswith("12. What is the output of np.linspace"):
        question["answerText"] = "(c) [0, 0.25, 0.5, 0.75, 1]"
        return
    if heading.startswith("Question 2 (20 Marks)") and "Newton" in text:
        question["answerText"] = (
            "r(t) = M y''(t) + b y'(t) + k y(t)\n"
            "惯性力 FM = M y''，摩擦力 Ff = b y'，弹簧力 Fk = k y。\n"
            "合力为零：r(t) - FM - Fk - Ff = 0，所以外力等于这三项之和。"
        )
        return
    if heading.startswith("Question 3 (30 Marks)"):
        question["answerText"] = (
            "按四步化简，最终传递函数看解答图的最后一步。\n"
            "1. 把含 H2 的负反馈求和点移到含 H1 的正反馈外面。\n"
            "2. 消去正反馈回路。\n"
            "3. 消去含 H2/G1 的回路。\n"
            "4. 消去剩下的反馈，得到 C/R。"
        )
        return
    if text.startswith("ANSWER 1) breadth-first"):
        question["answerText"] = (
            "走完全部节点：广度优先 S, A, G, B, C, D, D, G, G, G；深度优先 S, A, B, D, G, C, D, G, G, G。\n"
            "也可以在第一个目标停下：广度优先 S, A, G；深度优先 S, A, B, D, G。"
        )
        return
    if "The system will return" in text:
        question["answerText"] = (
            "结果是 W。推理路径是 Rule 3 → Rule 1 → Rule 4。\n"
            "A 推出 X，X、B、E 推出 Y，Y 和 C 推出 W。D 未知，Rule 2 不用。"
        )
        return
    if text:
        question["answerText"] = text


def render_clip(page, clip, path, hide):
    solo = fitz.open()
    solo.insert_pdf(page.parent, from_page=page.number, to_page=page.number)
    target = solo[0]
    if hide:
        for rect in hide["yellow"]:
            if rect.intersects(clip):
                target.add_redact_annot(rect)
        if hide["yellow"]:
            target.apply_redactions(
                images=fitz.PDF_REDACT_IMAGE_NONE,
                graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
                text=fitz.PDF_REDACT_TEXT_NONE,
            )
        for span in hide["marked"]:
            rect = span["bbox"]
            if not rect.intersects(clip):
                continue
            target.draw_rect(rect, color=(1, 1, 1), fill=(1, 1, 1), width=0)
            target.insert_text(
                fitz.Point(rect.x0, rect.y1 - 1.5),
                span["text"],
                fontsize=span["size"],
                fontname="times-roman",
                color=(0, 0, 0),
            )
        for rect in hide["red"]:
            if rect.intersects(clip):
                target.draw_rect(rect + (-1, -1, 1, 1), color=(1, 1, 1), fill=(1, 1, 1), width=0)
    pix = target.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=clip, alpha=False)
    pix.save(path)
    solo.close()


def build():
    os.makedirs(OUT, exist_ok=True)
    papers = []
    log = []
    for key, filename, title in PAPERS:
        doc = fitz.open(os.path.join(ROOT, filename))
        folder = os.path.join(OUT, key)
        os.makedirs(folder, exist_ok=True)
        questions = []
        current = None
        serial = 0

        def close_current():
            nonlocal current
            if current and current["parts"]:
                questions.append(current)
            current = None

        for page in doc:
            rows = lines_of(page)
            yellows = [fitz.Rect(item["rect"]) for item in page.get_drawings() if item.get("fill") == (1.0, 1.0, 0.0)]
            reds = []
            marked = []
            for block in page.get_text("dict")["blocks"]:
                if block.get("type") != 0:
                    continue
                for line in block["lines"]:
                    for span in line["spans"]:
                        if not span["text"].strip():
                            continue
                        info = {"bbox": fitz.Rect(span["bbox"]), "text": span["text"], "size": span["size"]}
                        if span["color"] in (15597568, 16711680) and re.match(r"^\(?[a-dA-D]\)", span["text"].strip()):
                            marked.append(info)
                        elif span["color"] in RED:
                            reds.append(info["bbox"])
            hide = {"yellow": yellows, "marked": marked, "red": reds}
            found = []
            for row in rows:
                head = heading_of(row["text"], row["color"])
                if head:
                    found.append((head, row["bbox"].y0, " ".join(row["text"].split())))
            ys = []
            if current is not None and (not found or found[0][1] > 70):
                y1 = found[0][1] if found else page.rect.height - 24
                ys.append((None, 36, y1, ""))
            for index, (head, y0, text) in enumerate(found):
                y1 = found[index + 1][1] if index + 1 < len(found) else page.rect.height - 24
                ys.append((head, y0, y1, text))
            for head, y0, y1, full in ys:
                if y1 - y0 < 18:
                    continue
                bottom = min(page.rect.height, y1 - 2)
                red_tops = [rect.y0 for rect in reds if y0 + 8 < rect.y0 < bottom]
                question_bottom = min(red_tops) - 4 if red_tops else bottom
                clip = fitz.Rect(24, max(0, y0 - 6), page.rect.width - 18, bottom)
                question_clip = fitz.Rect(clip.x0, clip.y0, clip.x1, max(clip.y0 + 8, question_bottom))
                if head:
                    close_current()
                    serial += 1
                    current = {
                        "id": f"{key}-{serial:02d}",
                        "heading": full[:240],
                        "parts": [],
                        "answer": [],
                    }
                if current is None:
                    continue
                part_no = len(current["parts"]) + 1
                q_name = f"{current['id']}-p{part_no}-q.png"
                a_name = f"{current['id']}-p{part_no}-a.png"
                if question_clip.height > 12:
                    render_clip(page, question_clip, os.path.join(folder, q_name), hide)
                else:
                    q_name = ""
                render_clip(page, clip, os.path.join(folder, a_name), None)
                reds_here = [row for row in rows if row["color"] in RED and row["bbox"].y0 >= y0 - 2 and row["bbox"].y1 <= y1 + 2]
                current["answer"].extend(" ".join(row["text"].split()) for row in reds_here)
                current["parts"].append({
                    "q": f"papers/{key}/{q_name}" if q_name else "",
                    "a": f"papers/{key}/{a_name}",
                })
                log.append(f"{current['id']} {current['heading'][:80]} part {part_no} y {y0:.0f}-{y1:.0f}")
        close_current()
        for question in questions:
            red_text = "\n".join(question["answer"])
            question["answerText"] = red_text
            question["explain"] = explain_for(key, question["heading"], red_text)
            del question["answer"]
            tidy_answer(question)
        papers.append({"id": key, "title": title, "file": filename, "questions": questions})
        doc.close()
    manifest = os.path.join(OUT, "papers.js")
    text = "const PAPERS = " + json.dumps(papers, ensure_ascii=False, indent=2) + ";\n"
    with open(manifest, "w", encoding="utf-8") as handle:
        handle.write(text)
    with open(os.path.join(OUT, "_log.txt"), "w", encoding="utf-8") as handle:
        handle.write("\n".join(log))
    print("questions", [len(paper["questions"]) for paper in papers])


if __name__ == "__main__":
    build()
