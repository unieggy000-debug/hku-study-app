const PAPERS = [
  {
    "id": "2022",
    "title": "28 November 2022 Quiz",
    "file": "IDAT 7215-2022.pdf",
    "questions": [
      {
        "id": "2022-01",
        "heading": "Question 1 (30 Marks)",
        "parts": [
          {
            "q": "papers/2022/2022-01-p1-q.png",
            "a": "papers/2022/2022-01-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2022-02",
        "heading": "1.1 What are the differences between lists and sets in Python? (5 Marks)",
        "parts": [
          {
            "q": "papers/2022/2022-02-p1-q.png",
            "a": "papers/2022/2022-02-p1-a.png"
          }
        ],
        "answerText": "Ans: List: A list contains an arbitrary number of elements that are stored in sequential order. The elements don’t need to be of the same type. The list is mutable. Sets: The set represents a collection of unique elements. The set can be created by listing its elements between curly brackets. Sets are mutable.",
        "explain": "课件表格：list 有序、可变，元素可以不同类型；set 用花括号，元素不重复，可变，课件称为无序。\n课件表格里 set 可变，tuple 不可变。字符串也不能改其中某个字符。"
      },
      {
        "id": "2022-03",
        "heading": "1.2 What will be the output of the following Python code? (5 Marks)",
        "parts": [
          {
            "q": "papers/2022/2022-03-p1-q.png",
            "a": "papers/2022/2022-03-p1-a.png"
          }
        ],
        "answerText": "Ans: [1, 6]",
        "explain": "先按 reverse=True 从大到小排序，再按切片 [start:stop:step] 取值。起点包含，终点不包含，负数步长从后往前取。"
      },
      {
        "id": "2022-04",
        "heading": "1.3 What will be the output of the following Python code? (5 Marks)",
        "parts": [
          {
            "q": "papers/2022/2022-04-p1-q.png",
            "a": "papers/2022/2022-04-p1-a.png"
          },
          {
            "q": "papers/2022/2022-04-p2-q.png",
            "a": "papers/2022/2022-04-p2-a.png"
          }
        ],
        "answerText": "Ans: [2, 7]",
        "explain": "np.arange(16).reshape(4, 4) 是 4 行 4 列。row 取第 0、1 行，col 取第 2、3 列，按位置成对取出 2 和 7。"
      },
      {
        "id": "2022-05",
        "heading": "1.4 What will be the output of the following Python code? (5 Marks)",
        "parts": [
          {
            "q": "papers/2022/2022-05-p1-q.png",
            "a": "papers/2022/2022-05-p1-a.png"
          }
        ],
        "answerText": "Ans: [4 5 6]",
        "explain": "np.arange(3) 得到 0、1、2，每个加 4，打印是 [4 5 6]。"
      },
      {
        "id": "2022-06",
        "heading": "1.5 What will be the output of the following Python code? (5 Marks)",
        "parts": [
          {
            "q": "papers/2022/2022-06-p1-q.png",
            "a": "papers/2022/2022-06-p1-a.png"
          }
        ],
        "answerText": "Ans: [7 20 17 15]",
        "explain": "axis=0 是顺着每一列往下加，结果的个数等于列数。"
      },
      {
        "id": "2022-07",
        "heading": "1.6 What will be the output of the following Python code? (5 Marks)",
        "parts": [
          {
            "q": "papers/2022/2022-07-p1-q.png",
            "a": "papers/2022/2022-07-p1-a.png"
          }
        ],
        "answerText": "Ans: Hello, Peter",
        "explain": "调用时传入 Peter，默认参数 Joe 不会被用到。"
      },
      {
        "id": "2022-08",
        "heading": "Question 2 (20 Marks)",
        "parts": [
          {
            "q": "papers/2022/2022-08-p1-q.png",
            "a": "papers/2022/2022-08-p1-a.png"
          },
          {
            "q": "papers/2022/2022-08-p2-q.png",
            "a": "papers/2022/2022-08-p2-a.png"
          },
          {
            "q": "papers/2022/2022-08-p3-q.png",
            "a": "papers/2022/2022-08-p3-a.png"
          }
        ],
        "answerText": "r(t) = M y''(t) + b y'(t) + k y(t)\n惯性力 FM = M y''，摩擦力 Ff = b y'，弹簧力 Fk = k y。\n合力为零：r(t) - FM - Fk - Ff = 0，所以外力等于这三项之和。",
        "explain": "卷面按牛顿第二定律写合力。外力 r 等于质量的加速度项、阻尼项和弹簧项之和：r = M y'' + b y' + k y。图和式子以卷面红色解答为准。"
      },
      {
        "id": "2022-09",
        "heading": "Question 3 (30 Marks)",
        "parts": [
          {
            "q": "papers/2022/2022-09-p1-q.png",
            "a": "papers/2022/2022-09-p1-a.png"
          },
          {
            "q": "papers/2022/2022-09-p2-q.png",
            "a": "papers/2022/2022-09-p2-a.png"
          }
        ],
        "answerText": "按四步化简，最终传递函数看解答图的最后一步。\n1. 把含 H2 的负反馈求和点移到含 H1 的正反馈外面。\n2. 消去正反馈回路。\n3. 消去含 H2/G1 的回路。\n4. 消去剩下的反馈，得到 C/R。",
        "explain": "化简按这四步：把含 H2 的负反馈求和点移到含 H1 的正反馈外面；消去正反馈；再消去含 H2/G1 的回路；最后消去剩下的反馈，得到总传递函数。最终式子以解答图上的最后一步为准。"
      },
      {
        "id": "2022-10",
        "heading": "Question 4 (20 Marks)",
        "parts": [
          {
            "q": "papers/2022/2022-10-p1-q.png",
            "a": "papers/2022/2022-10-p1-a.png"
          },
          {
            "q": "papers/2022/2022-10-p2-q.png",
            "a": "papers/2022/2022-10-p2-a.png"
          }
        ],
        "answerText": "走完全部节点：广度优先 S, A, G, B, C, D, D, G, G, G；深度优先 S, A, B, D, G, C, D, G, G, G。\n也可以在第一个目标停下：广度优先 S, A, G；深度优先 S, A, B, D, G。",
        "explain": "同一棵树，从左到右。走完全部节点时，广度优先是 S, A, G, B, C, D, D, G, G, G；深度优先是 S, A, B, D, G, C, D, G, G, G。卷面同时接受在第一个目标停下：广度优先 S, A, G；深度优先 S, A, B, D, G。"
      }
    ]
  },
  {
    "id": "2024",
    "title": "13 March 2024 Midterm",
    "file": "IDAT 7215-2024.pdf",
    "questions": [
      {
        "id": "2024-01",
        "heading": "Part I: (50 marks)",
        "parts": [
          {
            "q": "papers/2024/2024-01-p1-q.png",
            "a": "papers/2024/2024-01-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2024-02",
        "heading": "Question 1 (30 Marks)",
        "parts": [
          {
            "q": "papers/2024/2024-02-p1-q.png",
            "a": "papers/2024/2024-02-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2024-03",
        "heading": "1. Which of the following is a type of program error?",
        "parts": [
          {
            "q": "papers/2024/2024-03-p1-q.png",
            "a": "papers/2024/2024-03-p1-a.png"
          }
        ],
        "answerText": "(d) All of the above. Answer: (d) All are possible types of error that can occur while running the program (see first lecture of IDAT7215 for details).",
        "explain": "语法错误、逻辑错误、运行时错误都是程序错误，所以选 (d)。"
      },
      {
        "id": "2024-04",
        "heading": "2. Is Python code compiled or interpreted?",
        "parts": [
          {
            "q": "papers/2024/2024-04-p1-q.png",
            "a": "papers/2024/2024-04-p1-a.png"
          }
        ],
        "answerText": "(a) Python code is both compiled and interpreted Answer: (a) Many languages have been implemented using both compilers and interpreters, including C, Pascal, and Python.",
        "explain": "2024 卷面答案是 Python 既可以编译也可以解释。课件把 Python 列在解释器例子里。这道按卷面答案选 both。"
      },
      {
        "id": "2024-05",
        "heading": "3. What is a cell in Jupyter Notebook?",
        "parts": [
          {
            "q": "papers/2024/2024-05-p1-q.png",
            "a": "papers/2024/2024-05-p1-a.png"
          }
        ],
        "answerText": "(a) A unit of code that can be executed. Answer: (a) A cell in Jupyter Notebook is a unit of code that can be executed.",
        "explain": "Lab 1：Shift+Enter 运行格子。代码格写代码，Markdown 格写文字。笔记本文件是 .ipynb。"
      },
      {
        "id": "2024-06",
        "heading": "4. What is the difference between a Code cell and a Markdown cell in Jupyter Notebook?",
        "parts": [
          {
            "q": "papers/2024/2024-06-p1-q.png",
            "a": "papers/2024/2024-06-p1-a.png"
          }
        ],
        "answerText": "(a) Code cells are used for writing code, while Markdown cells are used for writing text. Answer: (a) Code cells are used for writing code, while Markdown cells are used for writing text.",
        "explain": "Lab 1：Shift+Enter 运行格子。代码格写代码，Markdown 格写文字。笔记本文件是 .ipynb。"
      },
      {
        "id": "2024-07",
        "heading": "5. Which file format does Jupyter Notebook use to store notebooks?",
        "parts": [
          {
            "q": "papers/2024/2024-07-p1-q.png",
            "a": "papers/2024/2024-07-p1-a.png"
          }
        ],
        "answerText": "(a) .ipynb Answer: (a) Jupyter Notebook uses the. ipynb file format to store notebooks.",
        "explain": "Lab 1：Shift+Enter 运行格子。代码格写代码，Markdown 格写文字。笔记本文件是 .ipynb。"
      },
      {
        "id": "2024-08",
        "heading": "6. How can you share a Jupyter Notebook with others?",
        "parts": [
          {
            "q": "papers/2024/2024-08-p1-q.png",
            "a": "papers/2024/2024-08-p1-a.png"
          },
          {
            "q": "papers/2024/2024-08-p2-q.png",
            "a": "papers/2024/2024-08-p2-a.png"
          }
        ],
        "answerText": "d) All of the above Answer: (d) You can share a Jupyter Notebook with others by sending them the .ipynb file, exporting the notebook to a different file format, such as HTML or PDF, or hosting the notebook on a website or server.",
        "explain": "Lab 1：Shift+Enter 运行格子。代码格写代码，Markdown 格写文字。笔记本文件是 .ipynb。"
      },
      {
        "id": "2024-09",
        "heading": "7. Which of the following is not a core data type in Python programming?",
        "parts": [
          {
            "q": "papers/2024/2024-09-p1-q.png",
            "a": "papers/2024/2024-09-p1-a.png"
          }
        ],
        "answerText": "(b) Class. Answer: (b) Class is a user-defined data type.",
        "explain": "list、tuple、dict 是课件里的数据结构。class 是用户自己定义的类型，卷面不把它算作核心数据类型。"
      },
      {
        "id": "2024-10",
        "heading": "8. What does NumPy stand for in Python?",
        "parts": [
          {
            "q": "papers/2024/2024-10-p1-q.png",
            "a": "papers/2024/2024-10-p1-a.png"
          }
        ],
        "answerText": "(b) Numerical Python. Answer: (b) NumPy stands for Numerical Python and is a Python package for scientific computing.",
        "explain": "NumPy 是 Numerical Python，用来做数值计算。"
      },
      {
        "id": "2024-11",
        "heading": "9. What is the purpose of the NumPy library in Jupyter Notebook?",
        "parts": [
          {
            "q": "papers/2024/2024-11-p1-q.png",
            "a": "papers/2024/2024-11-p1-a.png"
          }
        ],
        "answerText": "c) To perform mathematical calculations Answer: (c) The NumPy library is used to perform mathematical calculations in Jupyter Notebook.",
        "explain": "NumPy 是 Numerical Python，用来做数值计算。"
      },
      {
        "id": "2024-12",
        "heading": "10. What is the purpose of the panda's library in Jupyter Notebook?",
        "parts": [
          {
            "q": "papers/2024/2024-12-p1-q.png",
            "a": "papers/2024/2024-12-p1-a.png"
          }
        ],
        "answerText": "(b) To manipulate and analyze data Answer: (b) The panda’s library is used to manipulate and analyze data in Jupyter Notebook.",
        "explain": "Pandas 用来整理和分析表格数据。"
      },
      {
        "id": "2024-13",
        "heading": "11. Traffic light system is an example of:",
        "parts": [
          {
            "q": "papers/2024/2024-13-p1-q.png",
            "a": "papers/2024/2024-13-p1-a.png"
          }
        ],
        "answerText": "(a) Open-loop system Answer: (a) The traffic lamp will glow according to the set timing and sequence and is time-dependent. The sequence and time are controlled by relays that work on the pre-programmed time. It does not depend upon the rush of the road. Hence the correct answer is option (a).",
        "explain": "卷面把交通灯当作开环：按预先设好的时间切换，不根据路况反馈。这段属于控制系统，本地课件文件夹里还没有对应幻灯片，答案以卷面为准。"
      },
      {
        "id": "2024-14",
        "heading": "12. A control system is stochastic if:",
        "parts": [
          {
            "q": "papers/2024/2024-14-p1-q.png",
            "a": "papers/2024/2024-14-p1-a.png"
          },
          {
            "q": "papers/2024/2024-14-p2-q.png",
            "a": "papers/2024/2024-14-p2-a.png"
          }
        ],
        "answerText": "(a) the response to input is unpredictable. Answer: (a) A control system is stochastic if the response to the input is not predictable (see class lecture week3_1_control.pdf for details)",
        "explain": "卷面定义：随机控制系统对输入的响应不可预测。确定系统则是可预测、可重复。"
      },
      {
        "id": "2024-15",
        "heading": "13. In an expert system, the knowledge base component contains the information about the",
        "parts": [
          {
            "q": "papers/2024/2024-15-p1-q.png",
            "a": "papers/2024/2024-15-p1-a.png"
          }
        ],
        "answerText": "(a) Rules and Facts Answer: (a) The knowledge base contains the rules and facts about the knowledge that is gathered from the experts.",
        "explain": "专家系统的知识库存放事实和规则，包括启发式知识。第 3 讲和第 6 讲之前的专家系统课件都是这个划分。"
      },
      {
        "id": "2024-16",
        "heading": "14. The key difference between supervised and unsupervised machine learning is",
        "parts": [
          {
            "q": "papers/2024/2024-16-p1-q.png",
            "a": "papers/2024/2024-16-p1-a.png"
          }
        ],
        "answerText": "(a) Supervised learning requires labeled data, while unsupervised learning does not. Answer: (a) The presence or absence of labeled data in the training set distinguishes supervised and unsupervised learning approaches.",
        "explain": "有监督用带标签的数据，无监督没有标签。第 6 讲补充：无监督适合从没有标签的数据里找结构，例如聚类和关联规则。\n第 6 讲（reading week 前新课件）把无监督分成聚类和关联规则：K-Means 是排他聚类；Apriori 用 support、confidence、lift 找一起出现的物品。"
      },
      {
        "id": "2024-17",
        "heading": "15. Which of the following is not a supervised machine learning algorithm?",
        "parts": [
          {
            "q": "papers/2024/2024-17-p1-q.png",
            "a": "papers/2024/2024-17-p1-a.png"
          },
          {
            "q": "papers/2024/2024-17-p2-q.png",
            "a": "papers/2024/2024-17-p2-a.png"
          }
        ],
        "answerText": "(a) K-means Answer: (a) Decision tree, SVM (Support vector machines) for classification problems and Naïve Bayes are examples of the supervised machine learning algorithm. K-means is an example of an unsupervised machine- learning algorithm.",
        "explain": "K-Means 是无监督聚类。第 6 讲：它把样本排他地分进 k 个簇。Naive Bayes、SVM、决策树是有监督。\n第 6 讲（reading week 前新课件）把无监督分成聚类和关联规则：K-Means 是排他聚类；Apriori 用 support、confidence、lift 找一起出现的物品。"
      },
      {
        "id": "2024-18",
        "heading": "Question 2 (20 Marks)",
        "parts": [
          {
            "q": "papers/2024/2024-18-p1-q.png",
            "a": "papers/2024/2024-18-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2024-19",
        "heading": "1. The interpreter translates the entire source code into machine code before execution.",
        "parts": [
          {
            "q": "papers/2024/2024-19-p1-q.png",
            "a": "papers/2024/2024-19-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: The compiler translates the entire source code into machine code before execution while the interpreter translates code line by line during execution.",
        "explain": "编译器在运行前翻译全部源程序。解释器执行时逐行翻译，所以卷面认为它比编译器慢。"
      },
      {
        "id": "2024-20",
        "heading": "2. The interpreter executes faster compared to the compiler.",
        "parts": [
          {
            "q": "papers/2024/2024-20-p1-q.png",
            "a": "papers/2024/2024-20-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: The compiler translates the entire source code into machine code before execution while the interpreter translates code line by line during execution which makes it slower compared to the compiler.",
        "explain": "编译器在运行前翻译全部源程序。解释器执行时逐行翻译，所以卷面认为它比编译器慢。"
      },
      {
        "id": "2024-21",
        "heading": "3. Logical errors are found when the program runs to completion without error but produces the wrong output.",
        "parts": [
          {
            "q": "papers/2024/2024-21-p1-q.png",
            "a": "papers/2024/2024-21-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "逻辑错误会跑完，但不崩溃，结果是错的。"
      },
      {
        "id": "2024-22",
        "heading": "4. When the order of the denominator polynomial is greater than the numerator polynomial the transfer function is said",
        "parts": [
          {
            "q": "papers/2024/2024-22-p1-q.png",
            "a": "papers/2024/2024-22-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "分母多项式的阶数高于分子时，这个传递函数称为 proper。这句判断是对的。"
      },
      {
        "id": "2024-23",
        "heading": "5. A control system is deterministic if the response to input is predictable and repeatable.",
        "parts": [
          {
            "q": "papers/2024/2024-23-p1-q.png",
            "a": "papers/2024/2024-23-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "卷面：确定系统对输入的响应可预测、可重复。"
      },
      {
        "id": "2024-24",
        "heading": "6. If all the poles of the system lie in the left half plane the system is said to be unstable.",
        "parts": [
          {
            "q": "papers/2024/2024-24-p1-q.png",
            "a": "papers/2024/2024-24-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: If all the poles of the system lie in the left half plane the system is said to be stable.",
        "explain": "卷面更正：极点都在左半平面时系统是稳定的，不是不稳定。"
      },
      {
        "id": "2024-25",
        "heading": "7. Expert systems are only as good as the data and rules they are given.",
        "parts": [
          {
            "q": "papers/2024/2024-25-p1-q.png",
            "a": "papers/2024/2024-25-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "专家系统的结论不会比给定的数据和规则更好。这句是对的。"
      },
      {
        "id": "2024-26",
        "heading": "8. The main purpose of the Interference Engine in an expert system is to input data and interact with the user.",
        "parts": [
          {
            "q": "papers/2024/2024-26-p1-q.png",
            "a": "papers/2024/2024-26-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: The main purpose of the User Interface in an expert system is to input data and interact with the user.",
        "explain": "和用户问答的是用户界面。推理机负责用知识库做推理。卷面把 Inference 印成了 Interference。"
      },
      {
        "id": "2024-27",
        "heading": "9. Support Vector Machine (SVM) and Random Forest algorithms are examples of supervised machine learning.",
        "parts": [
          {
            "q": "papers/2024/2024-27-p1-q.png",
            "a": "papers/2024/2024-27-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "SVM 和随机森林都是有监督算法。"
      },
      {
        "id": "2024-28",
        "heading": "10. Recommendations systems are a classic example of unsupervised machine learning.",
        "parts": [
          {
            "q": "papers/2024/2024-28-p1-q.png",
            "a": "papers/2024/2024-28-p1-a.png"
          },
          {
            "q": "papers/2024/2024-28-p2-q.png",
            "a": "papers/2024/2024-28-p2-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "卷面把推荐系统当作无监督的典型例子。第 6 讲的关联规则和电影推荐也是无监督学习。\n第 6 讲（reading week 前新课件）把无监督分成聚类和关联规则：K-Means 是排他聚类；Apriori 用 support、confidence、lift 找一起出现的物品。"
      },
      {
        "id": "2024-29",
        "heading": "Part II: (50 marks)",
        "parts": [
          {
            "q": "papers/2024/2024-29-p1-q.png",
            "a": "papers/2024/2024-29-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2024-30",
        "heading": "Question 3 (30 marks):",
        "parts": [
          {
            "q": "papers/2024/2024-30-p1-q.png",
            "a": "papers/2024/2024-30-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2024-31",
        "heading": "3.1 What are the differences between lists and sets in Python? (6 Marks)",
        "parts": [
          {
            "q": "papers/2024/2024-31-p1-q.png",
            "a": "papers/2024/2024-31-p1-a.png"
          }
        ],
        "answerText": "Answer: List: A list contains an arbitrary number of elements that are stored in sequential order. The elements don’t need to be of the same type. The list is mutable. Sets: The set represents a collection of unique elements. The set can be created by listing its elements between curly brackets. Sets are mutable.",
        "explain": "课件表格：list 有序、可变，元素可以不同类型；set 用花括号，元素不重复，可变，课件称为无序。\n课件表格里 set 可变，tuple 不可变。字符串也不能改其中某个字符。"
      },
      {
        "id": "2024-32",
        "heading": "3.2 What will be the output of the following Python code? (4 marks)",
        "parts": [
          {
            "q": "papers/2024/2024-32-p1-q.png",
            "a": "papers/2024/2024-32-p1-a.png"
          }
        ],
        "answerText": "Ans: [7,11]",
        "explain": "先按 reverse=True 从大到小排序，再按切片 [start:stop:step] 取值。起点包含，终点不包含，负数步长从后往前取。"
      },
      {
        "id": "2024-33",
        "heading": "3.3 What will be the output of the following Python code? (4 marks)",
        "parts": [
          {
            "q": "papers/2024/2024-33-p1-q.png",
            "a": "papers/2024/2024-33-p1-a.png"
          }
        ],
        "answerText": "Ans: print(a.ndim)=3, print(a.shape)=(2,2,3), print(a.size)=12",
        "explain": "ndim 是维度个数，shape 是每一维的长度，size 是元素总数。"
      },
      {
        "id": "2024-34",
        "heading": "3.4 What will be the output of the following Python code? (4 marks)",
        "parts": [
          {
            "q": "papers/2024/2024-34-p1-q.png",
            "a": "papers/2024/2024-34-p1-a.png"
          },
          {
            "q": "papers/2024/2024-34-p2-q.png",
            "a": "papers/2024/2024-34-p2-a.png"
          }
        ],
        "answerText": "Ans: [10 23]",
        "explain": "NumPy 花式索引按 (row[i], col[i]) 成对取元素。arange 不含终点。打印用空格，卷面有时写成逗号，数值以卷面为准。"
      },
      {
        "id": "2024-35",
        "heading": "3.5 What will be the output of the following Python code? (4 marks)",
        "parts": [
          {
            "q": "papers/2024/2024-35-p1-q.png",
            "a": "papers/2024/2024-35-p1-a.png"
          }
        ],
        "answerText": "Ans: [1, 6]",
        "explain": "先按 reverse=True 从大到小排序，再按切片 [start:stop:step] 取值。起点包含，终点不包含，负数步长从后往前取。"
      },
      {
        "id": "2024-36",
        "heading": "3.6 What will be the output of the following Python code? (4 marks)",
        "parts": [
          {
            "q": "papers/2024/2024-36-p1-q.png",
            "a": "papers/2024/2024-36-p1-a.png"
          }
        ],
        "answerText": "Ans: Hello, Peter",
        "explain": "调用时传入 Peter，默认参数 Joe 不会被用到。"
      },
      {
        "id": "2024-37",
        "heading": "3.7 What will be the output of the following Python code? (4 marks)",
        "parts": [
          {
            "q": "papers/2024/2024-37-p1-q.png",
            "a": "papers/2024/2024-37-p1-a.png"
          },
          {
            "q": "papers/2024/2024-37-p2-q.png",
            "a": "papers/2024/2024-37-p2-a.png"
          }
        ],
        "answerText": "Ans: John",
        "explain": "DataFrame 的 iloc[1, 1] 是第 2 行、第 2 列。这一列写的是姓名，所以打印 John。列名是字符串，iloc 不看列名。"
      },
      {
        "id": "2024-38",
        "heading": "Question 4 (10 marks)",
        "parts": [
          {
            "q": "papers/2024/2024-38-p1-q.png",
            "a": "papers/2024/2024-38-p1-a.png"
          }
        ],
        "answerText": "走完全部节点：广度优先 S, A, G, B, C, D, D, G, G, G；深度优先 S, A, B, D, G, C, D, G, G, G。\n也可以在第一个目标停下：广度优先 S, A, G；深度优先 S, A, B, D, G。",
        "explain": "同一棵树，从左到右。走完全部节点时，广度优先是 S, A, G, B, C, D, D, G, G, G；深度优先是 S, A, B, D, G, C, D, G, G, G。卷面同时接受在第一个目标停下：广度优先 S, A, G；深度优先 S, A, B, D, G。"
      },
      {
        "id": "2024-39",
        "heading": "Question-5 (10 marks)",
        "parts": [
          {
            "q": "papers/2024/2024-39-p1-q.png",
            "a": "papers/2024/2024-39-p1-a.png"
          },
          {
            "q": "papers/2024/2024-39-p2-q.png",
            "a": "papers/2024/2024-39-p2-a.png"
          }
        ],
        "answerText": "结果是 W。推理路径是 Rule 3 → Rule 1 → Rule 4。\nA 推出 X，X、B、E 推出 Y，Y 和 C 推出 W。D 未知，Rule 2 不用。",
        "explain": "正向链从已知事实出发。A 成立推出 X（Rule 3），X、B、E 成立推出 Y（Rule 1），Y、C 成立推出 W（Rule 4）。D 未知，Rule 2 不使用。"
      }
    ]
  },
  {
    "id": "2025",
    "title": "23 October 2025 Midterm",
    "file": "IDAT 7215-MidTerm_Answer.pdf",
    "questions": [
      {
        "id": "2025-01",
        "heading": "Part I: (80 marks)",
        "parts": [
          {
            "q": "papers/2025/2025-01-p1-q.png",
            "a": "papers/2025/2025-01-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2025-02",
        "heading": "Question 1 (60 Marks)",
        "parts": [
          {
            "q": "papers/2025/2025-02-p1-q.png",
            "a": "papers/2025/2025-02-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2025-03",
        "heading": "1. Which programming language was originally developed for UNIX?",
        "parts": [
          {
            "q": "papers/2025/2025-03-p1-q.png",
            "a": "papers/2025/2025-03-p1-a.png"
          }
        ],
        "answerText": "(b) C",
        "explain": "第 1 讲：C 是 Dennis Ritchie 为 UNIX 写的。"
      },
      {
        "id": "2025-04",
        "heading": "2. Which of the following is a basic data type in Python?",
        "parts": [
          {
            "q": "papers/2025/2025-04-p1-q.png",
            "a": "papers/2025/2025-04-p1-a.png"
          }
        ],
        "answerText": "(c) int",
        "explain": "课件的基本类型有 int。list 是数据结构，不是这道题要的基本类型。"
      },
      {
        "id": "2025-05",
        "heading": "3. Which command is used to run a cell in Jupyter Notebook?",
        "parts": [
          {
            "q": "papers/2025/2025-05-p1-q.png",
            "a": "papers/2025/2025-05-p1-a.png"
          }
        ],
        "answerText": "(a) Shift + Enter",
        "explain": "Lab 1：Shift+Enter 运行格子。代码格写代码，Markdown 格写文字。笔记本文件是 .ipynb。"
      },
      {
        "id": "2025-06",
        "heading": "4. Which statement is used for error handling in Python?",
        "parts": [
          {
            "q": "papers/2025/2025-06-p1-q.png",
            "a": "papers/2025/2025-06-p1-a.png"
          }
        ],
        "answerText": "(a) try-except",
        "explain": "异常用 try-except。不处理的话，像除以零这种运行时错误会让程序崩溃。"
      },
      {
        "id": "2025-07",
        "heading": "5. What is the output of 15 % 2 in Python?",
        "parts": [
          {
            "q": "papers/2025/2025-07-p1-q.png",
            "a": "papers/2025/2025-07-p1-a.png"
          }
        ],
        "answerText": "(a) 1",
        "explain": "% 是余数。15 除以 2 余 1。// 才是整除 7。"
      },
      {
        "id": "2025-08",
        "heading": "6. Which of the following is a mutable data type in Python?",
        "parts": [
          {
            "q": "papers/2025/2025-08-p1-q.png",
            "a": "papers/2025/2025-08-p1-a.png"
          }
        ],
        "answerText": "(c) Set",
        "explain": "课件表格里 set 可变，tuple 不可变。字符串也不能改其中某个字符。"
      },
      {
        "id": "2025-09",
        "heading": "7. In Python, what is the result of 4**2?",
        "parts": [
          {
            "q": "papers/2025/2025-09-p1-q.png",
            "a": "papers/2025/2025-09-p1-a.png"
          }
        ],
        "answerText": "(b) 16",
        "explain": "** 是乘方。4 的 2 次方是 16。"
      },
      {
        "id": "2025-10",
        "heading": "8. How do you denote a comment in Python?",
        "parts": [
          {
            "q": "papers/2025/2025-10-p1-q.png",
            "a": "papers/2025/2025-10-p1-a.png"
          }
        ],
        "answerText": "(b) #",
        "explain": "Python 注释用 #。"
      },
      {
        "id": "2025-11",
        "heading": "9. Which statement is used to exit a loop prematurely in Python?",
        "parts": [
          {
            "q": "papers/2025/2025-11-p1-q.png",
            "a": "papers/2025/2025-11-p1-a.png"
          }
        ],
        "answerText": "(c) break",
        "explain": "break 结束整个循环。continue 只跳过这一轮。"
      },
      {
        "id": "2025-12",
        "heading": "10. What does the iloc attribute in Pandas do?",
        "parts": [
          {
            "q": "papers/2025/2025-12-p1-q.png",
            "a": "papers/2025/2025-12-p1-a.png"
          }
        ],
        "answerText": "(b) Access data by position",
        "explain": "iloc 按整数位置取，loc 按标签取。"
      },
      {
        "id": "2025-13",
        "heading": "11. What is the output of list(range(5))?",
        "parts": [
          {
            "q": "papers/2025/2025-13-p1-q.png",
            "a": "papers/2025/2025-13-p1-a.png"
          },
          {
            "q": "papers/2025/2025-13-p2-q.png",
            "a": "papers/2025/2025-13-p2-a.png"
          }
        ],
        "answerText": "(b) [0, 1, 2, 3, 4]",
        "explain": "range(5) 从 0 开始，不含 5，所以是 0 到 4。"
      },
      {
        "id": "2025-14",
        "heading": "12. What is the output of np.linspace(0, 1, 5)?",
        "parts": [
          {
            "q": "papers/2025/2025-14-p1-q.png",
            "a": "papers/2025/2025-14-p1-a.png"
          }
        ],
        "answerText": "(c) [0, 0.25, 0.5, 0.75, 1]",
        "explain": "linspace(0, 1, 5) 含两端，分成 5 个数，步长是 0.25，所以是 [0, 0.25, 0.5, 0.75, 1]，选 (c)。(d) 的步长是 0.2，那是 6 个数才会出现的间隔。"
      },
      {
        "id": "2025-15",
        "heading": "13. Which function is used to find the number of elements in an array?",
        "parts": [
          {
            "q": "papers/2025/2025-15-p1-q.png",
            "a": "papers/2025/2025-15-p1-a.png"
          }
        ],
        "answerText": "(c) size()",
        "explain": "数组元素个数用 size。ndim 是维数，shape 是每一维的长度。"
      },
      {
        "id": "2025-16",
        "heading": "14. In Matplotlib, which function is used to display a plot?",
        "parts": [
          {
            "q": "papers/2025/2025-16-p1-q.png",
            "a": "papers/2025/2025-16-p1-a.png"
          }
        ],
        "answerText": "(a) show()",
        "explain": "Matplotlib 用 show() 显示图像。plot() 是画线。"
      },
      {
        "id": "2025-17",
        "heading": "15. Which method is used to get the first few rows of a DataFrame?",
        "parts": [
          {
            "q": "papers/2025/2025-17-p1-q.png",
            "a": "papers/2025/2025-17-p1-a.png"
          }
        ],
        "answerText": "(a) df.head()",
        "explain": "df.head() 看表的开头几行。作业 2 用的是 head(6)。"
      },
      {
        "id": "2025-18",
        "heading": "16. In which scenario would you prefer using a list over a tuple in Python?",
        "parts": [
          {
            "q": "papers/2025/2025-18-p1-q.png",
            "a": "papers/2025/2025-18-p1-a.png"
          }
        ],
        "answerText": "(a) When you need a collection that can be modified after creation.",
        "explain": "需要事后修改内容时用 list。只要唯一值用 set。固定不变、或一次返回多个值，用 tuple。"
      },
      {
        "id": "2025-19",
        "heading": "17. A control system is stochastic if:",
        "parts": [
          {
            "q": "papers/2025/2025-19-p1-q.png",
            "a": "papers/2025/2025-19-p1-a.png"
          }
        ],
        "answerText": "(a) The response to input is unpredictable. Answer: (a) A control system is stochastic if the response to the input is not predictable (see class lecture week3_1_control.pdf for details)",
        "explain": "卷面定义：随机控制系统对输入的响应不可预测。确定系统则是可预测、可重复。"
      },
      {
        "id": "2025-20",
        "heading": "18. What does the transfer function represent in a control system?",
        "parts": [
          {
            "q": "papers/2025/2025-20-p1-q.png",
            "a": "papers/2025/2025-20-p1-a.png"
          }
        ],
        "answerText": "(a) Relationship between input and output.",
        "explain": "传递函数表示输入和输出之间的关系，选 (a)。"
      },
      {
        "id": "2025-21",
        "heading": "19. What does the term \"BIBO\" stand for in control systems?",
        "parts": [
          {
            "q": "papers/2025/2025-21-p1-q.png",
            "a": "papers/2025/2025-21-p1-a.png"
          },
          {
            "q": "papers/2025/2025-21-p2-q.png",
            "a": "papers/2025/2025-21-p2-a.png"
          }
        ],
        "answerText": "(a) Bounded Input Bounded Output.",
        "explain": "卷面：BIBO 是 Bounded Input Bounded Output，有界输入、有界输出。"
      },
      {
        "id": "2025-22",
        "heading": "20. Which of the following best describes a deterministic control system?",
        "parts": [
          {
            "q": "papers/2025/2025-22-p1-q.png",
            "a": "papers/2025/2025-22-p1-a.png"
          }
        ],
        "answerText": "(b) The output is predictable and repeatable.",
        "explain": "卷面：确定系统对输入的响应可预测、可重复。"
      },
      {
        "id": "2025-23",
        "heading": "21. What is the main advantage of depth-first search (DFS)?",
        "parts": [
          {
            "q": "papers/2025/2025-23-p1-q.png",
            "a": "papers/2025/2025-23-p1-a.png"
          }
        ],
        "answerText": "(b) It has low memory requirements.",
        "explain": "同一棵树，从左到右。走完全部节点时，广度优先是 S, A, G, B, C, D, D, G, G, G；深度优先是 S, A, B, D, G, C, D, G, G, G。卷面同时接受在第一个目标停下：广度优先 S, A, G；深度优先 S, A, B, D, G。\n深度优先只保存一条路径和未扩展的兄弟节点，所以内存占用低。它不保证最短路径，也不保证一定找到解。"
      },
      {
        "id": "2025-24",
        "heading": "22. Which algorithm combines the advantages of DFS and BFS?",
        "parts": [
          {
            "q": "papers/2025/2025-24-p1-q.png",
            "a": "papers/2025/2025-24-p1-a.png"
          }
        ],
        "answerText": "(b) Iterative deepening search.",
        "explain": "迭代加深把深度优先的低内存和广度优先的逐层推进合在一起。每提高一次深度上限，都会重做较浅层的工作。"
      },
      {
        "id": "2025-25",
        "heading": "23. Which of the following is NOT a reason for developing Expert Systems?",
        "parts": [
          {
            "q": "papers/2025/2025-25-p1-q.png",
            "a": "papers/2025/2025-25-p1-a.png"
          }
        ],
        "answerText": "(c) They can replicate common sense.",
        "explain": "专家系统的缺点就是没有常识。所以“能够复制常识”不是开发它的理由。"
      },
      {
        "id": "2025-26",
        "heading": "24. What does the knowledge base of an Expert System contain?",
        "parts": [
          {
            "q": "papers/2025/2025-26-p1-q.png",
            "a": "papers/2025/2025-26-p1-a.png"
          }
        ],
        "answerText": "(a) Factual and heuristic knowledge",
        "explain": "专家系统的知识库存放事实和规则，包括启发式知识。第 3 讲和第 6 讲之前的专家系统课件都是这个划分。"
      },
      {
        "id": "2025-27",
        "heading": "25. Which of the following describes forward chaining?",
        "parts": [
          {
            "q": "papers/2025/2025-27-p1-q.png",
            "a": "papers/2025/2025-27-p1-a.png"
          }
        ],
        "answerText": "(b) Moving from data input to a conclusion",
        "explain": "正向链从已知事实出发。A 成立推出 X（Rule 3），X、B、E 成立推出 Y（Rule 1），Y、C 成立推出 W（Rule 4）。D 未知，Rule 2 不使用。"
      },
      {
        "id": "2025-28",
        "heading": "26. Why was PyKE chosen for Expert Systems?",
        "parts": [
          {
            "q": "papers/2025/2025-28-p1-q.png",
            "a": "papers/2025/2025-28-p1-a.png"
          }
        ],
        "answerText": "(b) It is compatible with Python 3",
        "explain": "课件选用 PyKE，是因为它能在 Python 3 里运行。"
      },
      {
        "id": "2025-29",
        "heading": "27. The key difference between supervised and unsupervised machine learning is",
        "parts": [
          {
            "q": "papers/2025/2025-29-p1-q.png",
            "a": "papers/2025/2025-29-p1-a.png"
          }
        ],
        "answerText": "(a) Supervised learning requires labeled data, while unsupervised learning does not.",
        "explain": "有监督用带标签的数据，无监督没有标签。第 6 讲补充：无监督适合从没有标签的数据里找结构，例如聚类和关联规则。\n第 6 讲（reading week 前新课件）把无监督分成聚类和关联规则：K-Means 是排他聚类；Apriori 用 support、confidence、lift 找一起出现的物品。"
      },
      {
        "id": "2025-30",
        "heading": "28. Which of the following is not a supervised machine learning algorithm?",
        "parts": [
          {
            "q": "papers/2025/2025-30-p1-q.png",
            "a": "papers/2025/2025-30-p1-a.png"
          }
        ],
        "answerText": "(a) K-means",
        "explain": "K-Means 是无监督聚类。第 6 讲：它把样本排他地分进 k 个簇。Naive Bayes、SVM、决策树是有监督。\n第 6 讲（reading week 前新课件）把无监督分成聚类和关联规则：K-Means 是排他聚类；Apriori 用 support、confidence、lift 找一起出现的物品。"
      },
      {
        "id": "2025-31",
        "heading": "29. What is the output of Logistic Regression?",
        "parts": [
          {
            "q": "papers/2025/2025-31-p1-q.png",
            "a": "papers/2025/2025-31-p1-a.png"
          },
          {
            "q": "papers/2025/2025-31-p2-q.png",
            "a": "papers/2025/2025-31-p2-a.png"
          }
        ],
        "answerText": "(b) Categorical values",
        "explain": "逻辑回归做分类，输出类别。课件用 sigmoid，阈值 0.5。线性回归才输出连续数值。"
      },
      {
        "id": "2025-32",
        "heading": "30. What does the F1 score measure in a classification model?",
        "parts": [
          {
            "q": "papers/2025/2025-32-p1-q.png",
            "a": "papers/2025/2025-32-p1-a.png"
          }
        ],
        "answerText": "(b) The balance between precision and recall.",
        "explain": "F1 同时看精确率和召回率：2PR/(P+R)。"
      },
      {
        "id": "2025-33",
        "heading": "Question 2 (20 Marks)",
        "parts": [
          {
            "q": "papers/2025/2025-33-p1-q.png",
            "a": "papers/2025/2025-33-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2025-34",
        "heading": "1. Linkers do not handle library files; they only work with object files generated from source code.",
        "parts": [
          {
            "q": "papers/2025/2025-34-p1-q.png",
            "a": "papers/2025/2025-34-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: Linkers can also handle library files.",
        "explain": "链接器会处理目标文件和库，并解析引用。卷面这句“链接器不管库”是错的。"
      },
      {
        "id": "2025-35",
        "heading": "2. The interpreter executes faster compared to the compiler.",
        "parts": [
          {
            "q": "papers/2025/2025-35-p1-q.png",
            "a": "papers/2025/2025-35-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: The compiler translates the entire source code into machine code before execution. In contrast, the interpreter translates code line by line during execution, which makes it slower compared to the compiler.",
        "explain": "编译器在运行前翻译全部源程序。解释器执行时逐行翻译，所以卷面认为它比编译器慢。"
      },
      {
        "id": "2025-36",
        "heading": "3. A Python set can contain duplicate elements.",
        "parts": [
          {
            "q": "papers/2025/2025-36-p1-q.png",
            "a": "papers/2025/2025-36-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: The Sets are collections of unique elements.",
        "explain": "set 不保留重复元素。"
      },
      {
        "id": "2025-37",
        "heading": "4. Logical errors are found when the program runs to completion without error but produces the wrong output.",
        "parts": [
          {
            "q": "papers/2025/2025-37-p1-q.png",
            "a": "papers/2025/2025-37-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "逻辑错误会跑完，但不崩溃，结果是错的。"
      },
      {
        "id": "2025-38",
        "heading": "5. You can concatenate multiple strings at once by using the + operator in a single expression.",
        "parts": [
          {
            "q": "papers/2025/2025-38-p1-q.png",
            "a": "papers/2025/2025-38-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "Lab 1 用 + 把多段字符串接成一句。"
      },
      {
        "id": "2025-39",
        "heading": "6. A loop can be nested inside another loop in programming.",
        "parts": [
          {
            "q": "papers/2025/2025-39-p1-q.png",
            "a": "papers/2025/2025-39-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "循环里面可以再放循环。"
      },
      {
        "id": "2025-40",
        "heading": "7. In a control system, a controller is responsible for comparing the desired output to the actual output.",
        "parts": [
          {
            "q": "papers/2025/2025-40-p1-q.png",
            "a": "papers/2025/2025-40-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "控制器把期望输出和实际输出做比较，再决定怎么调。这句是对的。"
      },
      {
        "id": "2025-41",
        "heading": "8. A control system is deterministic if the response to input is predictable and repeatable.",
        "parts": [
          {
            "q": "papers/2025/2025-41-p1-q.png",
            "a": "papers/2025/2025-41-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "卷面：确定系统对输入的响应可预测、可重复。"
      },
      {
        "id": "2025-42",
        "heading": "9. If all the poles of the system lie in the left half plane, the system is said to be unstable.",
        "parts": [
          {
            "q": "papers/2025/2025-42-p1-q.png",
            "a": "papers/2025/2025-42-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: If all the poles of the system lie in the left half plane the system is said to be stable.",
        "explain": "卷面更正：极点都在左半平面时系统是稳定的，不是不稳定。"
      },
      {
        "id": "2025-43",
        "heading": "10. Breadth-first search (BFS) explores all nodes at the present depth before moving on to nodes at the next depth level.",
        "parts": [
          {
            "q": "papers/2025/2025-43-p1-q.png",
            "a": "papers/2025/2025-43-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "同一棵树，从左到右。走完全部节点时，广度优先是 S, A, G, B, C, D, D, G, G, G；深度优先是 S, A, B, D, G, C, D, G, G, G。卷面同时接受在第一个目标停下：广度优先 S, A, G；深度优先 S, A, B, D, G。"
      },
      {
        "id": "2025-44",
        "heading": "11. The complexity of a search algorithm is not affected by the branching factor of the search tree.",
        "parts": [
          {
            "q": "papers/2025/2025-44-p1-q.png",
            "a": "papers/2025/2025-44-p1-a.png"
          },
          {
            "q": "papers/2025/2025-44-p2-q.png",
            "a": "papers/2025/2025-44-p2-a.png"
          }
        ],
        "answerText": "(b) False Answer: The Complexity of a search algorithm is dependent on the branching factor of the search tree.",
        "explain": "搜索复杂度受分支因子 b 影响。卷面说“不受分支因子影响”是错的。"
      },
      {
        "id": "2025-45",
        "heading": "12. Bidirectional search runs two simultaneous searches, one from the start state and one from the goal state.",
        "parts": [
          {
            "q": "papers/2025/2025-45-p1-q.png",
            "a": "papers/2025/2025-45-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "双向搜索一边从起点、一边从目标同时搜，目标必须事先知道。"
      },
      {
        "id": "2025-46",
        "heading": "13. Heuristic functions are used in AI to guarantee the optimality of a search algorithm",
        "parts": [
          {
            "q": "papers/2025/2025-46-p1-q.png",
            "a": "papers/2025/2025-46-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: Heuristic functions provide estimates but do not guarantee optimality",
        "explain": "启发式只是估计，本身不保证最优。A* 还要求 h 不高估真实剩余代价。"
      },
      {
        "id": "2025-47",
        "heading": "14. An expert system is a computer program that simulates the decision-making ability of a human expert.",
        "parts": [
          {
            "q": "papers/2025/2025-47-p1-q.png",
            "a": "papers/2025/2025-47-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "专家系统就是用程序模拟人类专家做决策。这句是对的。"
      },
      {
        "id": "2025-48",
        "heading": "15. Expert systems are only as good as the data and rules they are given.",
        "parts": [
          {
            "q": "papers/2025/2025-48-p1-q.png",
            "a": "papers/2025/2025-48-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "专家系统的结论不会比给定的数据和规则更好。这句是对的。"
      },
      {
        "id": "2025-49",
        "heading": "16. The inference engine is responsible for reasoning and concluding the knowledge base.",
        "parts": [
          {
            "q": "papers/2025/2025-49-p1-q.png",
            "a": "papers/2025/2025-49-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "专家系统的知识库存放事实和规则，包括启发式知识。第 3 讲和第 6 讲之前的专家系统课件都是这个划分。\n和用户问答的是用户界面。推理机负责用知识库做推理。卷面把 Inference 印成了 Interference。"
      },
      {
        "id": "2025-50",
        "heading": "17. Cross-validation is a technique used to prevent underfitting in machine learning models.",
        "parts": [
          {
            "q": "papers/2025/2025-50-p1-q.png",
            "a": "papers/2025/2025-50-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: It helps prevent overfitting.",
        "explain": "卷面说明交叉验证是为了减轻过拟合，不是欠拟合。K 折把数据分成 K 份轮流验证，再平均准确率。"
      },
      {
        "id": "2025-51",
        "heading": "18. Supervised learning algorithms can be used for both classification and regression tasks.",
        "parts": [
          {
            "q": "papers/2025/2025-51-p1-q.png",
            "a": "papers/2025/2025-51-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "有监督既可以做回归（预测数值），也可以做分类（预测类别）。"
      },
      {
        "id": "2025-52",
        "heading": "19. Support Vector Machine (SVM) and Random Forest algorithms are examples of unsupervised machine learning.",
        "parts": [
          {
            "q": "papers/2025/2025-52-p1-q.png",
            "a": "papers/2025/2025-52-p1-a.png"
          }
        ],
        "answerText": "(b) False Answer: They are an example of supervised learning.",
        "explain": "SVM 和随机森林都是有监督算法。\n第 6 讲（reading week 前新课件）把无监督分成聚类和关联规则：K-Means 是排他聚类；Apriori 用 support、confidence、lift 找一起出现的物品。"
      },
      {
        "id": "2025-53",
        "heading": "20. Recommendation systems are a classic example of unsupervised machine learning.",
        "parts": [
          {
            "q": "papers/2025/2025-53-p1-q.png",
            "a": "papers/2025/2025-53-p1-a.png"
          }
        ],
        "answerText": "(a) True",
        "explain": "卷面把推荐系统当作无监督的典型例子。第 6 讲的关联规则和电影推荐也是无监督学习。\n第 6 讲（reading week 前新课件）把无监督分成聚类和关联规则：K-Means 是排他聚类；Apriori 用 support、confidence、lift 找一起出现的物品。"
      },
      {
        "id": "2025-54",
        "heading": "Part II: (20 marks)",
        "parts": [
          {
            "q": "papers/2025/2025-54-p1-q.png",
            "a": "papers/2025/2025-54-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2025-55",
        "heading": "Question 3 (10 marks):",
        "parts": [
          {
            "q": "papers/2025/2025-55-p1-q.png",
            "a": "papers/2025/2025-55-p1-a.png"
          }
        ],
        "answerText": "",
        "explain": ""
      },
      {
        "id": "2025-56",
        "heading": "3.1 What will be the output of the following Python code? (2 marks)",
        "parts": [
          {
            "q": "papers/2025/2025-56-p1-q.png",
            "a": "papers/2025/2025-56-p1-a.png"
          },
          {
            "q": "papers/2025/2025-56-p2-q.png",
            "a": "papers/2025/2025-56-p2-a.png"
          }
        ],
        "answerText": "Ans: [7,11]",
        "explain": "先按 reverse=True 从大到小排序，再按切片 [start:stop:step] 取值。起点包含，终点不包含，负数步长从后往前取。"
      },
      {
        "id": "2025-57",
        "heading": "3.2 What will be the output of the following Python code? (2 marks)",
        "parts": [
          {
            "q": "papers/2025/2025-57-p1-q.png",
            "a": "papers/2025/2025-57-p1-a.png"
          }
        ],
        "answerText": "Ans: [11 3]",
        "explain": "NumPy 花式索引按 (row[i], col[i]) 成对取元素。arange 不含终点。打印用空格，卷面有时写成逗号，数值以卷面为准。"
      },
      {
        "id": "2025-58",
        "heading": "3.3 What will be the output of the following Python code? (2 marks)",
        "parts": [
          {
            "q": "papers/2025/2025-58-p1-q.png",
            "a": "papers/2025/2025-58-p1-a.png"
          }
        ],
        "answerText": "Ans: [1, 6]",
        "explain": "先按 reverse=True 从大到小排序，再按切片 [start:stop:step] 取值。起点包含，终点不包含，负数步长从后往前取。"
      },
      {
        "id": "2025-59",
        "heading": "3.4 What will be the output of the following Python code? (2 marks)",
        "parts": [
          {
            "q": "papers/2025/2025-59-p1-q.png",
            "a": "papers/2025/2025-59-p1-a.png"
          }
        ],
        "answerText": "Ans: Hello, Peter",
        "explain": "调用时传入 Peter，默认参数 Joe 不会被用到。"
      },
      {
        "id": "2025-60",
        "heading": "3.5 What will be the output of the following Python code? (2 marks)",
        "parts": [
          {
            "q": "papers/2025/2025-60-p1-q.png",
            "a": "papers/2025/2025-60-p1-a.png"
          },
          {
            "q": "papers/2025/2025-60-p2-q.png",
            "a": "papers/2025/2025-60-p2-a.png"
          }
        ],
        "answerText": "Ans: John",
        "explain": "DataFrame 的 iloc[1, 1] 是第 2 行、第 2 列。这一列写的是姓名，所以打印 John。列名是字符串，iloc 不看列名。"
      },
      {
        "id": "2025-61",
        "heading": "Question 4 (4 marks)",
        "parts": [
          {
            "q": "papers/2025/2025-61-p1-q.png",
            "a": "papers/2025/2025-61-p1-a.png"
          }
        ],
        "answerText": "走完全部节点：广度优先 S, A, G, B, C, D, D, G, G, G；深度优先 S, A, B, D, G, C, D, G, G, G。\n也可以在第一个目标停下：广度优先 S, A, G；深度优先 S, A, B, D, G。",
        "explain": "同一棵树，从左到右。走完全部节点时，广度优先是 S, A, G, B, C, D, D, G, G, G；深度优先是 S, A, B, D, G, C, D, G, G, G。卷面同时接受在第一个目标停下：广度优先 S, A, G；深度优先 S, A, B, D, G。"
      },
      {
        "id": "2025-62",
        "heading": "Question-5 (6 marks)",
        "parts": [
          {
            "q": "papers/2025/2025-62-p1-q.png",
            "a": "papers/2025/2025-62-p1-a.png"
          },
          {
            "q": "papers/2025/2025-62-p2-q.png",
            "a": "papers/2025/2025-62-p2-a.png"
          }
        ],
        "answerText": "结果是 W。推理路径是 Rule 3 → Rule 1 → Rule 4。\nA 推出 X，X、B、E 推出 Y，Y 和 C 推出 W。D 未知，Rule 2 不用。",
        "explain": "正向链从已知事实出发。A 成立推出 X（Rule 3），X、B、E 成立推出 Y（Rule 1），Y、C 成立推出 W（Rule 4）。D 未知，Rule 2 不使用。"
      }
    ]
  }
];
