const QUIZ_SETS = [
  {
    id: "choice",
    title: "选择题 · Multiple Choice",
    when: "课堂 1–5 全覆盖",
    blurb: "50 道原卷风格单选：辨认定义、工具、算法与公式。不会时先排除两个明显错误项。",
    questions: [
      { id:"mc01", topic:"Class 1 · Programming", stem:"Which statement best describes an algorithm?", choices:["A finite sequence of steps for solving a problem","A Python error message","A type of computer hardware","A chart drawn by Matplotlib"], answer:0, explain:"算法是解决问题的一组有限、明确步骤；它不等于某一种编程语言。" },
      { id:"mc02", topic:"Class 1 · Languages", stem:"Which language is directly understood by a computer processor?", choices:["Machine language","High-level language","Natural language","Pseudocode"], answer:0, explain:"处理器直接执行机器语言；高级语言通常需要编译或解释。" },
      { id:"mc03", topic:"Class 1 · Translation", stem:"What does a compiler normally do?", choices:["Translates the whole source program before execution","Translates only the current line during execution","Repairs every logical error","Stores data in a DataFrame"], answer:0, explain:"编译器通常先整体翻译；解释器则在运行时逐句处理。" },
      { id:"mc04", topic:"Class 1 · Program building", stem:"Which component combines object files and libraries into an executable file?", choices:["Linker","Interpreter","Debugger","Editor"], answer:0, explain:"源程序经编译得到 object file，再由 linker 连接模块和库，生成 executable。" },
      { id:"mc05", topic:"Class 1 · Errors", stem:"A program runs to completion but gives a wrong answer. What kind of error is this?", choices:["Logical error","Syntax error","Run-time error","Linking error"], answer:0, explain:"能运行但结果错误，属于 logical error；这是原卷常见概念辨析。" },
      { id:"mc06", topic:"Class 1 · Python types", stem:"What is the type of the result of 7 / 2 in Python 3?", choices:["float","int","bool","str"], answer:0, explain:"普通除法 / 返回 float，7 / 2 得 3.5；整除使用 //。" },
      { id:"mc07", topic:"Class 1 · Operators", stem:"Which operator returns the remainder of a division?", choices:["%","//","**","/"], answer:0, explain:"% 求余数；// 求整除结果；** 求幂。" },
      { id:"mc08", topic:"Class 1 · Boolean", stem:"Which expression evaluates to True?", choices:["3 < 5 and 8 != 2","3 > 5 or 8 == 2","not (4 == 4)","7 in [1, 2, 3]"], answer:0, explain:"第一项两个条件都为真；其余表达式均为 False。" },
      { id:"mc09", topic:"Class 1 · Collections", stem:"Which Python collection stores key-value pairs?", choices:["Dictionary","Tuple","List","Set"], answer:0, explain:"Dictionary 通过 key 找 value，例如 {'name':'Amy'}。" },
      { id:"mc10", topic:"Class 1 · Collections", stem:"Which Python collection is ordered and immutable?", choices:["Tuple","List","Set","Dictionary"], answer:0, explain:"Tuple 有顺序但不可修改；这里考单个性质，不是 list/set 背诵题。" },
      { id:"mc11", topic:"Class 1 · Slicing", stem:"For a sequence s, what does s[1:4] select?", choices:["Indices 1, 2 and 3","Indices 1, 2, 3 and 4","Indices 0, 1, 2 and 3","Only index 4"], answer:0, explain:"切片包含起点、不包含终点，所以取 1、2、3。" },
      { id:"mc12", topic:"Class 1 · List methods", stem:"Which method adds every element of another list to the end of a list?", choices:["extend()","append()","sort()","pop()"], answer:0, explain:"extend 会逐个接入；append 会把整个对象作为一个元素加入。" },
      { id:"mc13", topic:"Class 1 · Functions", stem:"Which call uses a keyword argument?", choices:["area(width=4)","area(4)","area()","def area(width):"], answer:0, explain:"调用时显式写出参数名 width=4，就是 keyword argument。" },
      { id:"mc14", topic:"Class 1 · Control flow", stem:"What does continue do inside a loop?", choices:["Skips the rest of the current iteration","Ends the whole loop immediately","Restarts the Python interpreter","Returns a value from a function"], answer:0, explain:"continue 跳过本轮剩余语句，进入下一轮；break 才是结束整个循环。" },
      { id:"mc15", topic:"Class 1 · Exceptions", stem:"Which construct is used to handle a run-time exception in Python?", choices:["try ... except","if ... else","for ... in","def ... return"], answer:0, explain:"可能出错的代码放进 try，异常处理放进 except。" },
      { id:"mc16", topic:"Class 1 · Environment", stem:"What is a useful feature of a Jupyter Notebook?", choices:["Code can be run one cell at a time in a browser","It converts every program directly to machine code","It guarantees that code has no errors","It stores only images"], answer:0, explain:"Jupyter 的核心是按 cell 交互运行，适合课堂实验与数据分析。" },

      { id:"mc17", topic:"Class 2 · NumPy", stem:"Which attribute gives the dimensions of a NumPy array as a tuple?", choices:["shape","size","ndim","dtype"], answer:0, explain:"shape 是各维长度组成的 tuple；ndim 是维数；size 是元素总数。" },
      { id:"mc18", topic:"Class 2 · NumPy", stem:"Which NumPy attribute gives the total number of elements?", choices:["size","shape","ndim","index"], answer:0, explain:"size 直接返回数组中元素总数。" },
      { id:"mc19", topic:"Class 2 · NumPy", stem:"Which function is most suitable for creating exactly 5 evenly spaced values from 0 to 1, including both endpoints?", choices:["np.linspace(0, 1, 5)","np.arange(0, 1, 5)","np.zeros(0, 1, 5)","np.reshape(0, 1, 5)"], answer:0, explain:"linspace 按“点的个数”生成等间隔值，并默认包含两端。" },
      { id:"mc20", topic:"Class 2 · NumPy", stem:"What must remain unchanged when an array is reshaped?", choices:["The total number of elements","The number of rows","The number of dimensions","The data type must become float"], answer:0, explain:"reshape 可以改行列和维数，但新旧 shape 的元素总数必须相同。" },
      { id:"mc21", topic:"Class 2 · NumPy", stem:"For a 2-D array, what does np.sum(a, axis=0) produce?", choices:["One sum for each column","One sum for each row","Only the largest value","A sorted copy of the array"], answer:0, explain:"axis=0 沿竖直方向压缩行，因此留下每一列的和。" },
      { id:"mc22", topic:"Class 2 · NumPy", stem:"Which operation creates a new axis?", choices:["np.stack","np.concatenate","np.split","np.sort"], answer:0, explain:"stack 会新增维度；concatenate 沿已有维度拼接。" },
      { id:"mc23", topic:"Class 2 · NumPy", stem:"What does NumPy broadcasting allow?", choices:["Element-wise operations on compatible shapes","Every array to be reshaped to any size","A list to store keys and values","A graph to search itself"], answer:0, explain:"广播会把兼容的维度视作扩展后逐元素运算，不是任意 shape 都能广播。" },
      { id:"mc24", topic:"Class 2 · NumPy", stem:"What does np.argsort(a) return?", choices:["Indices that would sort a","A sorted copy of a","The number of values in a","Only the smallest value"], answer:0, explain:"argsort 返回排序后对应的原下标，不返回排序后的数值本身。" },
      { id:"mc25", topic:"Class 2 · Visualisation", stem:"Which chart is normally best for showing the relationship between two numerical variables?", choices:["Scatter plot","Pie chart","Histogram","Single bar"], answer:0, explain:"两个数值变量的关系通常看 scatter plot；单变量分布常看 histogram。" },
      { id:"mc26", topic:"Class 2 · SciPy", stem:"Which SciPy subpackage is associated with numerical integration?", choices:["scipy.integrate","scipy.fft","scipy.linalg","scipy.interpolate"], answer:0, explain:"integrate 用于积分；fft 傅里叶；linalg 线性代数；interpolate 插值。" },
      { id:"mc27", topic:"Class 2 · Pandas", stem:"Which Pandas object represents a labelled two-dimensional table?", choices:["DataFrame","Series","ndarray scalar","Tuple"], answer:0, explain:"DataFrame 是二维表；Series 是一维带标签数据。" },
      { id:"mc28", topic:"Class 2 · Pandas", stem:"Which indexer selects rows or columns by integer position?", choices:["iloc","loc","dropna","isnull"], answer:0, explain:"iloc 按整数位置；loc 按标签。" },
      { id:"mc29", topic:"Class 2 · Missing data", stem:"Which method removes rows containing missing values?", choices:["dropna()","isnull()","nunique()","head()"], answer:0, explain:"dropna 删除缺失行；isnull 只标记缺失位置。" },

      { id:"mc30", topic:"Class 3 · AI search", stem:"Which item is part of a search-problem formulation?", choices:["Initial state","Python indentation style","DataFrame column colour","Compiler version"], answer:0, explain:"搜索问题通常需要 initial state、actions、transition model、goal test 和 path cost。" },
      { id:"mc31", topic:"Class 3 · Search", stem:"Which search method expands the shallowest unexpanded node first?", choices:["Breadth-first search","Depth-first search","Greedy best-first search","A* search"], answer:0, explain:"BFS 一层一层扩展，优先最浅节点。" },
      { id:"mc32", topic:"Class 3 · Search", stem:"Which value is used to choose the next node in uniform-cost search?", choices:["Path cost g(n)","Heuristic h(n) only","Depth only","Alphabetical node name"], answer:0, explain:"UCS 选累计路径代价 g(n) 最小的节点。" },
      { id:"mc33", topic:"Class 3 · Search", stem:"Which evaluation function is used by A* search?", choices:["f(n) = g(n) + h(n)","f(n) = h(n) only","f(n) = g(n) - h(n)","f(n) = depth(n) only"], answer:0, explain:"A* 同时考虑已经花费的 g 和预计剩余的 h。" },
      { id:"mc34", topic:"Class 3 · Expert systems", stem:"Which component of an expert system stores IF-THEN rules?", choices:["Knowledge base","User interface","Compiler","Plotting library"], answer:0, explain:"Knowledge base 存事实和规则，inference engine 负责应用规则。" },
      { id:"mc35", topic:"Class 3 · Expert systems", stem:"Backward chaining starts from:", choices:["A goal to be proved","All available facts only","The shallowest search node","A random training sample"], answer:0, explain:"反向链从目标出发反查需要满足的条件；正向链从已有事实向结论推。" },

      { id:"mc36", topic:"Class 4 · PyKE", stem:"In the course PyKE workflow, which file extension stores facts?", choices:[".kfb",".krb",".kqb",".csv"], answer:0, explain:".kfb 是 knowledge fact base；.krb 是 rule base；.kqb 是 query base。" },
      { id:"mc37", topic:"Class 4 · Machine learning", stem:"Which relationship is correct?", choices:["Deep learning is a subset of machine learning, which is a subset of AI","AI is a subset of deep learning","Machine learning and AI are unrelated","Deep learning contains all AI"], answer:0, explain:"课程结构是 AI ⊃ ML ⊃ DL。" },
      { id:"mc38", topic:"Class 4 · Data splitting", stem:"Why should a test set not be used to train the model?", choices:["It is needed for an unbiased final evaluation","It always contains missing values","It can only contain text","It must be larger than the training set"], answer:0, explain:"测试集模拟未见数据；若参与训练，评估结果会虚高。" },
      { id:"mc39", topic:"Class 4 · Validation", stem:"What is the main purpose of k-fold cross-validation?", choices:["Estimate performance using several train-validation splits","Convert labels into source code","Replace all missing values","Draw a dendrogram"], answer:0, explain:"K 折轮流留一份验证，使评估不依赖一次随机切分。" },
      { id:"mc40", topic:"Class 4 · Models", stem:"Which task predicts a continuous numerical value?", choices:["Regression","Classification","Clustering","Association rule mining"], answer:0, explain:"回归预测连续数值；分类预测类别。" },
      { id:"mc41", topic:"Class 4 · Evaluation", stem:"Which metric is TP / (TP + FN)?", choices:["Recall","Precision","Accuracy","Support"], answer:0, explain:"Recall 看真正正类中找回多少；Precision 看预测为正的有多少是真的。" },
      { id:"mc42", topic:"Class 4 · Evaluation", stem:"For a highly imbalanced classification problem, which measure combines precision and recall?", choices:["F1 score","Array size","Path cost","Lift only"], answer:0, explain:"F1 是 precision 与 recall 的调和平均，类别不平衡时比单看 accuracy 更有参考价值。" },

      { id:"mc43", topic:"Class 5 · Clustering", stem:"Which learning setting uses data without target labels?", choices:["Unsupervised learning","Supervised learning","Compilation","Forward chaining"], answer:0, explain:"无监督学习没有已知标签，聚类是典型任务。" },
      { id:"mc44", topic:"Class 5 · K-means", stem:"In K-means, each point is assigned to:", choices:["The nearest centroid","The deepest tree node","Every cluster at the same time","The rule with highest confidence"], answer:0, explain:"K-means 反复执行“分给最近中心—更新中心”。" },
      { id:"mc45", topic:"Class 5 · K-means", stem:"What is the elbow method mainly used for?", choices:["Choosing a suitable number of clusters K","Choosing a Python interpreter","Computing classification recall","Removing missing rows"], answer:0, explain:"观察误差随 K 增大下降的拐点，作为 K 的候选。" },
      { id:"mc46", topic:"Class 5 · Hierarchical clustering", stem:"Agglomerative hierarchical clustering begins with:", choices:["Each item in its own cluster","All items in one cluster","A labelled test set","A fixed IF-THEN rule"], answer:0, explain:"Agglomerative 自底向上，从每点一簇开始逐步合并；divisive 相反。" },
      { id:"mc47", topic:"Class 5 · Hierarchical clustering", stem:"What does a dendrogram display?", choices:["The order and distance at which clusters merge","Only the final class labels","Python source and object files","A confusion matrix"], answer:0, explain:"树状图展示层次聚类的合并关系与合并距离。" },
      { id:"mc48", topic:"Class 5 · Association rules", stem:"For the rule X → Y, confidence is:", choices:["support(X ∪ Y) / support(X)","support(X) + support(Y)","support(X) / support(Y)","1 / support(X ∪ Y)"], answer:0, explain:"Confidence 表示出现 X 时也出现 Y 的比例。" },
      { id:"mc49", topic:"Class 5 · Association rules", stem:"What does lift greater than 1 suggest for X → Y?", choices:["X and Y occur together more than expected under independence","X and Y never occur together","The rule has zero support","The data must be labelled"], answer:0, explain:"lift > 1 表示正关联；=1 近似独立；<1 为负关联。" },
      { id:"mc50", topic:"Class 5 · Apriori", stem:"Which principle is used by the Apriori algorithm?", choices:["If an itemset is frequent, all of its subsets must be frequent","Every larger itemset is always more frequent","Only labelled data can be processed","Every rule has confidence 1"], answer:0, explain:"Apriori 用频繁项集的向下封闭性质剪枝：子集不频繁，超集也不可能频繁。" }
    ]
  },
  {
    id: "truefalse",
    title: "判断题 · True / False",
    when: "高频易混点速刷",
    blurb: "30 道短判断。先圈出 always、only、must、include 等绝对词，再找一个反例。",
    questions: [
      { id:"tf01", topic:"Class 1 · Translation", stem:"An interpreter normally translates and executes a program statement by statement.", choices:["True","False"], answer:0, explain:"True。解释器通常在运行时逐句翻译和执行。" },
      { id:"tf02", topic:"Class 1 · Errors", stem:"A syntax error means that the program finishes successfully but produces a wrong result.", choices:["True","False"], answer:1, explain:"False。那是 logical error；syntax error 是写法不符合语法。" },
      { id:"tf03", topic:"Class 1 · Python", stem:"In Python, 9 // 4 evaluates to 2.", choices:["True","False"], answer:0, explain:"True。// 是整除，舍去小数部分。" },
      { id:"tf04", topic:"Class 1 · Python", stem:"The expression 2 ** 3 evaluates to 6.", choices:["True","False"], answer:1, explain:"False。** 是幂运算，2³ = 8。" },
      { id:"tf05", topic:"Class 1 · Collections", stem:"A tuple can be modified after it is created.", choices:["True","False"], answer:1, explain:"False。Tuple 是 immutable。" },
      { id:"tf06", topic:"Class 1 · Slicing", stem:"The stop index in Python slicing is excluded.", choices:["True","False"], answer:0, explain:"True。切片左闭右开。" },
      { id:"tf07", topic:"Class 1 · List methods", stem:"list.append([3, 4]) adds 3 and 4 as two separate elements.", choices:["True","False"], answer:1, explain:"False。append 把整个 [3,4] 当成一个元素；extend 才会拆开。" },
      { id:"tf08", topic:"Class 1 · Loops", stem:"break exits the nearest enclosing loop.", choices:["True","False"], answer:0, explain:"True。break 结束当前最近的一层循环。" },
      { id:"tf09", topic:"Class 1 · Functions", stem:"A default argument allows a function call to omit that argument.", choices:["True","False"], answer:0, explain:"True。省略时会使用定义中的默认值。" },

      { id:"tf10", topic:"Class 2 · NumPy", stem:"A NumPy array can have more than two dimensions.", choices:["True","False"], answer:0, explain:"True。可有 scalar、vector、matrix 以及更高维 tensor。" },
      { id:"tf11", topic:"Class 2 · NumPy", stem:"np.arange(1, 6) includes the value 6.", choices:["True","False"], answer:1, explain:"False。arange 与 range 类似，终点不包含。" },
      { id:"tf12", topic:"Class 2 · NumPy", stem:"An array with shape (3, 4) has size 12.", choices:["True","False"], answer:0, explain:"True。元素总数为 3×4=12。" },
      { id:"tf13", topic:"Class 2 · NumPy", stem:"reshape() may change the total number of elements in an array.", choices:["True","False"], answer:1, explain:"False。reshape 前后 size 必须相同。" },
      { id:"tf14", topic:"Class 2 · NumPy", stem:"np.concatenate always creates one additional dimension.", choices:["True","False"], answer:1, explain:"False。concatenate 沿现有轴连接；stack 才新增轴。" },
      { id:"tf15", topic:"Class 2 · NumPy", stem:"Boolean masking can select all array values satisfying a condition.", choices:["True","False"], answer:0, explain:"True。例如 a[a > 5]。" },
      { id:"tf16", topic:"Class 2 · Pandas", stem:"loc selects by labels, while iloc selects by integer positions.", choices:["True","False"], answer:0, explain:"True。这是 Pandas 最常考的辨析之一。" },
      { id:"tf17", topic:"Class 2 · Visualisation", stem:"A histogram is commonly used to inspect the distribution of one numerical variable.", choices:["True","False"], answer:0, explain:"True。散点图则常看两个变量关系。" },

      { id:"tf18", topic:"Class 3 · Search", stem:"Breadth-first search expands nodes level by level.", choices:["True","False"], answer:0, explain:"True。BFS 使用先进先出的 frontier，先浅后深。" },
      { id:"tf19", topic:"Class 3 · Search", stem:"Depth-first search is guaranteed to find the shallowest solution in every search space.", choices:["True","False"], answer:1, explain:"False。DFS 先一路深入，不保证最浅解，某些空间还可能陷入无限分支。" },
      { id:"tf20", topic:"Class 3 · Search", stem:"Greedy best-first search chooses a node using h(n) only.", choices:["True","False"], answer:0, explain:"True。Greedy 只看预计剩余代价；A* 看 g+h。" },
      { id:"tf21", topic:"Class 3 · Search", stem:"Uniform-cost search chooses the node with the smallest accumulated path cost.", choices:["True","False"], answer:0, explain:"True。它按 g(n) 排序，不按深度或 h(n)。" },
      { id:"tf22", topic:"Class 3 · Expert systems", stem:"Forward chaining is goal-driven and starts from the conclusion to be proved.", choices:["True","False"], answer:1, explain:"False。描述的是 backward chaining；forward chaining 是 data-driven。" },
      { id:"tf23", topic:"Class 3 · Expert systems", stem:"The inference engine applies rules from the knowledge base to known facts.", choices:["True","False"], answer:0, explain:"True。规则存储与规则执行是两个不同组件。" },

      { id:"tf24", topic:"Class 4 · Machine learning", stem:"Supervised learning requires labelled training examples.", choices:["True","False"], answer:0, explain:"True。标签给出目标答案，模型据此学习输入到输出的映射。" },
      { id:"tf25", topic:"Class 4 · Evaluation", stem:"A model that performs very well on training data but poorly on unseen data may be overfitting.", choices:["True","False"], answer:0, explain:"True。这是过拟合的典型表现。" },
      { id:"tf26", topic:"Class 4 · Evaluation", stem:"Accuracy alone is always sufficient for a highly imbalanced classification problem.", choices:["True","False"], answer:1, explain:"False。还应关注 precision、recall、F1 和 confusion matrix。" },
      { id:"tf27", topic:"Class 4 · Validation", stem:"In k-fold cross-validation, each fold is used for validation once.", choices:["True","False"], answer:0, explain:"True。K 轮中每一份轮流成为验证集。" },

      { id:"tf28", topic:"Class 5 · K-means", stem:"K-means requires the number of clusters K to be chosen before the algorithm runs.", choices:["True","False"], answer:0, explain:"True。可借助 elbow method 选择较合理的 K。" },
      { id:"tf29", topic:"Class 5 · Hierarchical clustering", stem:"Divisive clustering starts with all data in one cluster and repeatedly splits it.", choices:["True","False"], answer:0, explain:"True。Divisive 自顶向下；agglomerative 自底向上。" },
      { id:"tf30", topic:"Class 5 · Association rules", stem:"A rule with high confidence must also have high support.", choices:["True","False"], answer:1, explain:"False。一个很少出现的 X 也可能每次都伴随 Y，从而 confidence 高但 support 低。" }
    ]
  },
  {
    id: "output",
    title: "代码输出简答 · Written Output",
    when: "逐行追踪专项",
    blurb: "24 道历年卷同型变式。只写程序打印的内容；先在草稿上逐行更新变量，再落答案。",
    questions: [
      { id:"out01", type:"output", topic:"Class 1 · Arithmetic", stem:"Write the exact output.", code:"x = 11\ny = 4\nprint(x // y, x % y)", expect:"2 3", model:"2 3", explain:"11 // 4 = 2，11 % 4 = 3。" },
      { id:"out02", type:"output", topic:"Class 1 · Types", stem:"Write the exact output.", code:"a = 5\nb = 2\nprint(a / b)\nprint(type(a / b).__name__)", expect:"2.5\nfloat", model:"2.5\nfloat", explain:"Python 3 的 / 返回浮点数。" },
      { id:"out03", type:"output", topic:"Class 1 · Strings", stem:"Write the exact output.", code:"word = 'python'\nprint(word[1:5:2])", expect:"yh", model:"yh", explain:"下标 1 到 4、步长 2，取到 y 和 h。" },
      { id:"out04", type:"output", topic:"Class 1 · Lists", stem:"Write the exact output.", code:"a = [2, 4]\na.append([6, 8])\nprint(a)", expect:"[2, 4, [6, 8]]", model:"[2, 4, [6, 8]]", explain:"append 把整个列表作为一个新元素。" },
      { id:"out05", type:"output", topic:"Class 1 · Lists", stem:"Write the exact output.", code:"a = [2, 4]\na.extend([6, 8])\nprint(a)", expect:"[2, 4, 6, 8]", model:"[2, 4, 6, 8]", explain:"extend 把参数中的元素逐个接入。" },
      { id:"out06", type:"output", topic:"Class 1 · Lists", stem:"Write the exact output.", code:"nums = [4, 1, 3, 2]\nnums.sort(reverse=True)\nprint(nums[1:3])", expect:"[3, 2]", model:"[3, 2]", explain:"先降序得到 [4,3,2,1]，再取下标 1、2。" },
      { id:"out07", type:"output", topic:"Class 1 · Aliasing", stem:"Write the exact output.", code:"a = [1, 2]\nb = a\nb[0] = 9\nprint(a)", expect:"[9, 2]", model:"[9, 2]", explain:"b 与 a 指向同一个可变列表，修改 b 也改变 a。" },
      { id:"out08", type:"output", topic:"Class 1 · Dictionaries", stem:"Write the exact output.", code:"d = {'a': 2, 'b': 5}\nd['c'] = d['a'] + d['b']\nprint(d['c'])", expect:"7", model:"7", explain:"通过 key 取值，2+5 得 7。" },
      { id:"out09", type:"output", topic:"Class 1 · Loops", stem:"Write the exact output.", code:"total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)", expect:"10", model:"10", explain:"range(1,5) 是 1、2、3、4，总和 10。" },
      { id:"out10", type:"output", topic:"Class 1 · continue", stem:"Write the exact output.", code:"s = 0\nfor x in [1, 2, 3, 4]:\n    if x % 2 == 0:\n        continue\n    s += x\nprint(s)", expect:"4", model:"4", explain:"偶数被跳过，只累加 1 和 3。" },
      { id:"out11", type:"output", topic:"Class 1 · Functions", stem:"Write the exact output.", code:"def f(x, step=2):\n    return x * step + 1\nprint(f(3))\nprint(f(3, step=4))", expect:"7\n13", model:"7\n13", explain:"第一次使用默认 step=2；第二次用关键字参数 step=4。" },
      { id:"out12", type:"output", topic:"Class 1 · Exceptions", stem:"Write the exact output.", code:"try:\n    print(8 // 0)\nexcept ZeroDivisionError:\n    print('error')", expect:"error", model:"error", explain:"整除零触发 ZeroDivisionError，执行 except。" },

      { id:"out13", type:"output", topic:"Class 2 · NumPy", stem:"Write the exact output.", code:"import numpy as np\na = np.arange(2, 10, 2)\nprint(a)", expect:"[2 4 6 8]", model:"[2 4 6 8]", explain:"起点 2、终点 10 不含、步长 2。" },
      { id:"out14", type:"output", topic:"Class 2 · NumPy shape", stem:"Write the exact output.", code:"import numpy as np\na = np.arange(12).reshape(3, 4)\nprint(a.shape)\nprint(a.size)", expect:"(3, 4)\n12", model:"(3, 4)\n12", explain:"3×4 数组，shape 为 tuple，size 为 12。" },
      { id:"out15", type:"output", topic:"Class 2 · NumPy indexing", stem:"Write the exact output.", code:"import numpy as np\na = np.array([[1, 2, 3], [4, 5, 6]])\nprint(a[1, 0])\nprint(a[:, 2])", expect:"4\n[3 6]", model:"4\n[3 6]", explain:"a[1,0] 是第二行第一列；冒号选择所有行的第三列。" },
      { id:"out16", type:"output", topic:"Class 2 · NumPy axis", stem:"Write the exact output.", code:"import numpy as np\na = np.array([[1, 2], [3, 4]])\nprint(np.sum(a, axis=0))\nprint(np.sum(a, axis=1))", expect:"[4 6]\n[3 7]", model:"[4 6]\n[3 7]", explain:"axis=0 得列和；axis=1 得行和。" },
      { id:"out17", type:"output", topic:"Class 2 · Broadcasting", stem:"Write the exact output.", code:"import numpy as np\na = np.array([[1], [3]])\nb = np.array([10, 20])\nprint(a + b)", expect:"[[11 21]\n [13 23]]", model:"[[11 21]\n [13 23]]", explain:"(2,1) 与 (2,) 广播成 (2,2)，逐元素相加。" },
      { id:"out18", type:"output", topic:"Class 2 · Boolean mask", stem:"Write the exact output.", code:"import numpy as np\na = np.array([2, 7, 4, 9, 1])\nprint(a[a > 4])", expect:"[7 9]", model:"[7 9]", explain:"布尔条件只保留大于 4 的元素，原顺序不变。" },
      { id:"out19", type:"output", topic:"Class 2 · Fancy indexing", stem:"Write the exact output.", code:"import numpy as np\na = np.array([10, 20, 30, 40])\nprint(a[[3, 1, 1]])", expect:"[40 20 20]", model:"[40 20 20]", explain:"花式索引按给定下标顺序取值，下标可以重复。" },
      { id:"out20", type:"output", topic:"Class 2 · argsort", stem:"Write the exact output.", code:"import numpy as np\na = np.array([30, 10, 20])\nprint(np.argsort(a))", expect:"[1 2 0]", model:"[1 2 0]", explain:"升序值为 10、20、30，它们原来的下标是 1、2、0。" },
      { id:"out21", type:"output", topic:"Class 2 · concatenate", stem:"Write the exact output.", code:"import numpy as np\na = np.array([1, 2])\nb = np.array([3, 4])\nprint(np.concatenate((a, b)))", expect:"[1 2 3 4]", model:"[1 2 3 4]", explain:"一维数组沿现有轴首尾连接。" },

      { id:"out22", type:"output", topic:"Class 2 · Pandas Series", stem:"Write the exact output.", code:"import pandas as pd\ns = pd.Series([5, 8, 3], index=['a', 'b', 'c'])\nprint(s.loc['b'])\nprint(s.iloc[2])", expect:"8\n3", model:"8\n3", explain:"loc 用标签 b；iloc[2] 用第三个位置。" },
      { id:"out23", type:"output", topic:"Class 2 · Pandas DataFrame", stem:"Write the exact output.", code:"import pandas as pd\ndf = pd.DataFrame({'x':[1, 2, 3], 'y':[4, 5, 6]})\nprint(df.shape)", expect:"(3, 2)", model:"(3, 2)", explain:"DataFrame 有 3 行、2 列。" },
      { id:"out24", type:"output", topic:"Class 2 · Pandas filtering", stem:"Write the exact output.", code:"import pandas as pd\ndf = pd.DataFrame({'score':[55, 72, 68]})\nprint(df[df['score'] >= 60]['score'].sum())", expect:"140", model:"140", explain:"筛出 72 和 68，再求和得到 140。" }
    ]
  },
  {
    id: "short",
    title: "核心对比简答 · Core Comparisons",
    when: "Class 1 · 必背简答",
    blurb: "2 道老师提示的必背题：Python 容器特征，以及 List 与 NumPy Array 的根本区别。",
    questions: [
      {
        id:"short01",
        type:"short",
        topic:"Class 1 · Python collections",
        stem:"Compare List, Tuple, Dictionary and Set in Python. For each collection, state whether it is ordered, whether duplicates are allowed, whether it is mutable, and how its elements are accessed.",
        model:"1. List\n- Ordered and allows duplicate elements.\n- Mutable: elements can be added, removed, or changed.\n- Supports indexing.\n\n2. Tuple\n- Ordered and allows duplicate elements.\n- Immutable: elements cannot be directly changed after creation.\n- Supports indexing.\n\n3. Dictionary\n- Ordered.\n- Keys must be unique, but values can be duplicated.\n- Mutable: key-value pairs can be added, removed, or changed.\n- Accessed by keys instead of positional indexes.\n\n4. Set\n- Unordered and does not allow duplicate elements.\n- Mutable: elements can be added or removed.\n- Does not support indexing.\n- Commonly used to remove duplicates and perform set operations.",
        explain:"答题时固定按四个维度写：顺序、重复、可变性、访问方式。Set 再补一句常用于去重和集合运算。"
      },
      {
        id:"short02",
        type:"short",
        topic:"Class 2 · NumPy fundamentals",
        stem:"What is the fundamental difference between a Python List and an Array?",
        model:"Python List can store elements of different data types, while an Array usually stores elements of the same data type. Arrays are generally more memory-efficient and faster for numerical computations.",
        explain:"老师强调的核心是数据类型：List 可以混合类型，NumPy Array 通常是同质数据。统一类型让 Array 在数值计算中通常更省内存、速度更快。"
      }
    ]
  }
];

// Day 1 专项：从已有题库中抽取第 1–2 课的代码输出与库功能题，避免和全科练习混在一起。
const day1Outputs = QUIZ_SETS.flatMap((set) => set.questions)
  .filter((q) => q.type === "output" && /^Class [12]/.test(q.topic))
  .slice(0, 12);
const day1Library = QUIZ_SETS.flatMap((set) => set.questions)
  .filter((q) => /^(choice|tf)/.test(q.id) && /^Class [12]/.test(q.topic) && /NumPy|Visualisation|SciPy|Pandas|Python|Collections|Slicing|Functions|Operators|Types/.test(q.topic))
  .slice(0, 8);
QUIZ_SETS.push({
  id: "day1",
  title: "Day 1 · 代码与库功能专项",
  when: "第 1–2 课 · 20 题",
  blurb: "只练代码输出和 Python / NumPy / Matplotlib / SciPy / Pandas 功能识别。建议先做这组，再做全科题。",
  questions: [...day1Outputs, ...day1Library]
});
// Day 2 专项按原卷的实际作答动作重排：概念题保留单选/判断，搜索必须看图走路径，评价指标既练原卷问法也练读矩阵。
const day2SearchTreeFigure = `<figure class="exam-figure search-exam-figure" aria-label="Search tree: S connects to A and B; A connects to C and D; B connects to E and goal G">
  <svg viewBox="0 0 620 245" role="img">
    <g class="tree-edges"><line x1="310" y1="42" x2="175" y2="112"/><line x1="310" y1="42" x2="445" y2="112"/><line x1="175" y1="112" x2="105" y2="202"/><line x1="175" y1="112" x2="245" y2="202"/><line x1="445" y1="112" x2="375" y2="202"/><line x1="445" y1="112" x2="515" y2="202"/></g>
    <g class="tree-nodes"><g><circle cx="310" cy="35" r="27"/><text x="310" y="42">S</text></g><g><circle cx="175" cy="105" r="27"/><text x="175" y="112">A</text></g><g><circle cx="445" cy="105" r="27"/><text x="445" y="112">B</text></g><g><circle cx="105" cy="195" r="27"/><text x="105" y="202">C</text></g><g><circle cx="245" cy="195" r="27"/><text x="245" y="202">D</text></g><g><circle cx="375" cy="195" r="27"/><text x="375" y="202">E</text></g><g class="goal-node"><circle cx="515" cy="195" r="27"/><text x="515" y="202">G</text></g></g>
  </svg><figcaption>Start = S · Goal = G · Expand children from left to right</figcaption>
</figure>`;
const day2ConfusionFigure = `<figure class="exam-figure metric-exam-figure" aria-label="Confusion matrix with TP 18, FN 2, FP 6 and TN 24"><table><thead><tr><th></th><th>Predicted +</th><th>Predicted −</th></tr></thead><tbody><tr><th>Actual +</th><td><b>TP = 18</b></td><td>FN = 2</td></tr><tr><th>Actual −</th><td>FP = 6</td><td><b>TN = 24</b></td></tr></tbody></table><figcaption>Read the four cells before choosing a formula.</figcaption></figure>`;
const day2Questions = [
  { id:"day2mc01", type:"choice", topic:"Class 3 · DFS", stem:"When memory is limited, which is a typical advantage of depth-first search?", choices:["It usually requires less memory","It always finds the shortest path","It expands every shallow node first","It guarantees a solution in an infinite tree"], answer:0, explain:"DFS mainly stores the current path and some unexpanded siblings, so its memory requirement is low. It does not guarantee the shortest path." },
  { id:"day2mc02", type:"choice", topic:"Class 3 · Iterative deepening", stem:"Which strategy repeatedly runs depth-limited DFS with a larger depth limit and combines ideas from BFS and DFS?", choices:["Iterative deepening search","Uniform-cost search","Greedy best-first search","Backward chaining"], answer:0, explain:"Iterative deepening keeps DFS's low-memory style while reaching progressively deeper levels like BFS." },
  { id:"day2mc03", type:"choice", topic:"Class 3 · Search tree path（原卷式图题）", stem:"Study the tree. Using BFS, which option gives both the node-selection order up to G and the returned solution path?", figure:day2SearchTreeFigure, choices:["Order: S, A, B, C, D, E, G; path: S → B → G","Order: S, A, C, D, B, E, G; path: S → B → G","Order: S, B, G; path: S → B → G","Order: S, A, B, G; path: S → A → G"], answer:0, explain:"BFS uses a FIFO queue and works level by level. It selects S; then A and B; then C, D, E and G. Parent links give the solution path S → B → G. 注意：访问/展开顺序不是最终路径，答案应分别写两项。" },
  { id:"day2mc04", type:"choice", topic:"Class 3 · Expert-system limits", stem:"Which ability should NOT be claimed as a normal reason for building an expert system?", choices:["Replicating human common sense in every situation","Preserving scarce expert knowledge","Providing consistent decisions","Making expertise available repeatedly"], answer:0, explain:"Expert systems can preserve and repeatedly apply explicit expertise, but their classic limitation is the lack of broad human common sense." },
  { id:"day2mc05", type:"choice", topic:"Class 3 · Knowledge base", stem:"What kind of knowledge is normally stored in an expert system's knowledge base?", choices:["Factual and heuristic knowledge","Only user-interface colours","Training and test images only","Compiler error messages"], answer:0, explain:"The knowledge base contains facts plus rules or heuristic knowledge gathered from experts." },
  { id:"day2mc06", type:"choice", topic:"Class 3 · Forward chaining", stem:"A system begins with known facts, fires matching IF–THEN rules and reaches a conclusion. Which reasoning method is this?", choices:["Forward chaining","Backward chaining","Depth-first search","Cross-validation"], answer:0, explain:"Forward chaining is data-driven: facts → applicable rules → new facts or conclusion." },
  { id:"day2mc07", type:"choice", topic:"Class 4 · PyKE", stem:"According to the course material, why was PyKE selected for the expert-system exercise?", choices:["It is compatible with Python 3","It automatically creates labeled data","It replaces every knowledge rule","It is a plotting package"], answer:0, explain:"The original-paper point is practical: PyKE was selected because it can run with Python 3." },
  { id:"day2mc08", type:"choice", topic:"Class 4 · Learning types", stem:"Which statement gives the fundamental difference between supervised and unsupervised learning?", choices:["Supervised learning uses labeled data; unsupervised learning does not","Only unsupervised learning uses data","Supervised learning never predicts categories","Unsupervised learning always receives rewards"], answer:0, explain:"The decisive clue is whether target labels y are provided during training." },
  { id:"day2mc09", type:"choice", topic:"Class 4 · Algorithms", stem:"Which algorithm is the odd one out because it is normally unsupervised?", choices:["K-means","Support Vector Machine","Decision Tree","Naive Bayes"], answer:0, explain:"K-means is an unsupervised clustering algorithm; SVM, Decision Tree and Naive Bayes are commonly supervised." },
  { id:"day2mc10", type:"choice", topic:"Class 4 · Model output", stem:"What kind of final output is Logistic Regression normally used to produce?", choices:["A categorical class","A cluster centroid only","A Python source file","An unlimited continuous value without a decision boundary"], answer:0, explain:"Despite its name, Logistic Regression is normally used for classification and produces a class/probability that is converted to a categorical decision." },
  { id:"day2mc11", type:"choice", topic:"Class 4 · F1 score（原卷直接问法）", stem:"What does the F1 score measure in a classification model?", choices:["The balance between precision and recall","Only the percentage of true negatives","The number of training folds","The distance between cluster centroids"], answer:0, explain:"This mirrors the original-paper wording. F1 is the harmonic mean 2PR / (P + R), so it balances precision and recall." },
  { id:"day2mc12", type:"choice", topic:"Class 4 · Confusion matrix（课程同型变式）", stem:"Using the confusion matrix, which pair of values is correct?", figure:day2ConfusionFigure, choices:["Precision = 18/(18+6) = 0.75; Recall = 18/(18+2) = 0.90","Precision = 18/(18+2) = 0.90; Recall = 18/(18+6) = 0.75","Precision = (18+24)/50 = 0.84; Recall = 18/24 = 0.75","Precision = 24/(24+6) = 0.80; Recall = 24/(24+2) ≈ 0.92"], answer:0, explain:"Precision 的分母看“预测为正”：TP+FP=24；Recall 的分母看“实际为正”：TP+FN=20。原卷直接考 F1 的含义；本题是依据课堂混淆矩阵内容制作的同型计算加固题。" },
  { id:"day2tf01", type:"tf", topic:"Class 3 · DFS path（图示变式）", stem:"For the displayed tree, a left-to-right DFS selects nodes in the order S, A, C, D, B, E, G before reaching the goal.", figure:day2SearchTreeFigure, choices:["True","False"], answer:0, explain:"True. DFS finishes A's branch first (A, C, D), backtracks, then follows B's branch (B, E, G). The returned path is still S → B → G." },
  { id:"day2tf02", type:"tf", topic:"Class 3 · Search complexity", stem:"The branching factor of a search tree has no effect on the time and memory complexity of a search algorithm.", choices:["True","False"], answer:1, explain:"False. A larger branching factor creates more successors at each level and can greatly increase time and memory." },
  { id:"day2tf03", type:"tf", topic:"Class 3 · Bidirectional search", stem:"Bidirectional search runs one search from the start and another from the known goal, hoping that the two frontiers meet.", choices:["True","False"], answer:0, explain:"True. It requires a clearly known goal and a way to search backward from it." },
  { id:"day2tf04", type:"tf", topic:"Class 3 · Heuristics", stem:"Using a heuristic function automatically guarantees that every informed search algorithm returns an optimal solution.", choices:["True","False"], answer:1, explain:"False. A heuristic is an estimate. Optimality needs extra conditions; for A*, the heuristic must not overestimate the remaining cost." },
  { id:"day2tf05", type:"tf", topic:"Class 3 · Expert systems", stem:"An expert system simulates the decision-making ability of a human expert in a limited domain.", choices:["True","False"], answer:0, explain:"True. The phrase limited domain matters: it applies encoded specialist knowledge, not general human intelligence." },
  { id:"day2tf06", type:"tf", topic:"Class 3 · Expert systems", stem:"The quality of an expert system can exceed any weakness in the facts and rules supplied to it without learning new knowledge.", choices:["True","False"], answer:1, explain:"False. Its conclusions are only as reliable as the facts and rules in its knowledge base." },
  { id:"day2tf07", type:"tf", topic:"Class 3 · Architecture", stem:"The user interface applies rules and derives conclusions, while the inference engine only collects user input.", choices:["True","False"], answer:1, explain:"False. The inference engine performs reasoning; the user interface handles interaction and input/output." },
  { id:"day2tf08", type:"tf", topic:"Class 4 · Cross-validation", stem:"Cross-validation is mainly used to prevent underfitting by making the model more complex.", choices:["True","False"], answer:1, explain:"False. In the original-paper framing, cross-validation helps detect or reduce overfitting and gives a more reliable performance estimate." },
  { id:"day2tf09", type:"tf", topic:"Class 4 · Algorithms", stem:"Support Vector Machine and Random Forest are normally supervised-learning algorithms.", choices:["True","False"], answer:0, explain:"True. Both learn from labeled examples in the course classification." }
];
QUIZ_SETS.push({
  id: "day2",
  title: "Day 2 · AI、搜索与机器学习专项",
  when: "第 3–4 课 · 21 题",
  blurb: "按原卷作答动作重排：12 道单选＋9 道判断。搜索题必须看树图写访问顺序和路径；评价指标包含原卷 F1 问法与一题混淆矩阵计算。",
  questions: day2Questions
});

// Day 3 专项：沿用历年卷的低难度命题风格，只加入课堂内容的一步计算，不要求完整多轮算法。
const day3KmeansFigure = `<figure class="exam-figure kmeans-exam-figure" aria-label="One-dimensional points 1, 2, 8 and 9, with initial centres 1 and 9"><span class="seed">1</span><span>2</span><span>8</span><span class="seed">9</span><small>Data points: 1, 2, 8, 9 · Initial centres: 1 and 9</small></figure>`;
const day3ElbowFigure = `<figure class="exam-figure elbow-exam-figure" aria-label="Elbow curve labelled K 1 to 7, with a clear bend at K equals 3"><svg viewBox="0 0 460 245" role="img"><line class="axis" x1="45" y1="15" x2="45" y2="190"/><line class="axis" x1="45" y1="190" x2="430" y2="190"/><line class="elbow-guide" x1="180" y1="145" x2="180" y2="190"/><polyline class="curve" points="70,30 125,85 180,145 235,164 290,174 345,180 400,184"/><circle class="elbow-dot" cx="180" cy="145" r="8"/><g class="ticks"><text x="67" y="207">1</text><text x="122" y="207">2</text><text class="chosen-tick" x="177" y="207">3</text><text x="232" y="207">4</text><text x="287" y="207">5</text><text x="342" y="207">6</text><text x="397" y="207">7</text></g><text class="elbow-label" x="188" y="137">elbow: K = 3</text><text x="170" y="235">Number of clusters K</text><text x="5" y="25">SSE</text></svg><figcaption>The curve drops sharply until K=3, then becomes much flatter. The bend is therefore at K=3.</figcaption></figure>`;
const day3DistanceFigure = `<figure class="exam-figure distance-exam-figure" aria-label="Distance matrix for A B and C"><table><thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><th>A</th><td>0</td><td>2</td><td>4</td></tr><tr><th>B</th><td>2</td><td>0</td><td>7</td></tr><tr><th>C</th><td>4</td><td>7</td><td>0</td></tr></tbody></table><figcaption>Small distance matrix · smaller value means closer</figcaption></figure>`;
const day3BasketFigure = `<figure class="exam-figure basket-exam-figure" aria-label="Five market basket transactions"><table><thead><tr><th>Transaction</th><th>Items</th></tr></thead><tbody><tr><th>T1</th><td>Bread, Milk</td></tr><tr><th>T2</th><td>Bread, Milk</td></tr><tr><th>T3</th><td>Bread</td></tr><tr><th>T4</th><td>Eggs</td></tr><tr><th>T5</th><td>Butter</td></tr></tbody></table><figcaption>5 transactions · Bread appears 3 times; Milk appears 2 times; both appear together 2 times.</figcaption></figure>`;
const day3Questions = [
  { id:"day3mc01", type:"choice", topic:"Class 5 · 原卷高频概念", stem:"What is the most fundamental clue that a learning problem is unsupervised?", choices:["It always uses rewards","The training data has no target labels","It must predict a continuous number","It can only process images"], answer:1, explain:"无监督学习没有标准答案 y，需要从未标记数据中寻找隐藏结构。" },
  { id:"day3mc02", type:"choice", topic:"Class 5 · 算法归类", stem:"Which algorithm is normally an unsupervised clustering algorithm?", choices:["Logistic Regression","Support Vector Machine","K-means","Random Forest"], answer:2, explain:"K-means 是无监督聚类；另外三项在本课程中归为监督学习算法。" },
  { id:"day3mc03", type:"choice", topic:"Class 5 · 原卷高频应用", stem:"Which is a classic application of unsupervised learning in the original papers?", choices:["Recommendation systems","Compiling Python source code","Forward chaining","Predicting a supplied class label"], answer:0, explain:"历年卷直接把 Recommendation systems 作为无监督学习的典型应用。" },
  { id:"day3mc04", type:"choice", topic:"Class 5 · Good clustering", stem:"Which result best describes good clustering?", choices:["Low similarity inside every cluster","All points placed in one cluster","High similarity between different clusters","High similarity within clusters and low similarity between clusters"], answer:3, explain:"口诀：组内抱紧、组间离远。即 high intra-cluster similarity、low inter-cluster similarity。" },
  { id:"day3mc05", type:"choice", topic:"Class 5 · K-means 一步小题", stem:"Assign each point to its nearest initial centre, then update each centre by the mean. What are the two new centres?", figure:day3KmeansFigure, choices:["1 and 9","1.5 and 8.5","2 and 8","5 and 5"], answer:1, explain:"分组为 {1,2} 和 {8,9}；新中心分别是 (1+2)/2=1.5、(8+9)/2=8.5。只考一轮分配与更新。" },
  { id:"day3mc06", type:"choice", topic:"Class 5 · Elbow 识图", stem:"According to the elbow plot, which K is the most reasonable first choice?", figure:day3ElbowFigure, choices:["K = 1","K = 6","K = 3","K = 8"], answer:2, explain:"K=3 之后 SSE 的下降明显变缓，因此弯折点在 3 附近。Elbow 是启发式选择，不是绝对证明。" },
  { id:"day3mc07", type:"choice", topic:"Class 5 · Hierarchical clustering", stem:"How does agglomerative hierarchical clustering begin?", choices:["Each data point starts as its own cluster","All data starts in one cluster","With labelled classes","By choosing a confidence threshold"], answer:0, explain:"Agglomerative 是 bottom-up：每点一簇，再不断合并最近的簇。" },
  { id:"day3mc08", type:"choice", topic:"Class 5 · Linkage 认法", stem:"In single-link hierarchical clustering, the distance between two clusters is based on:", choices:["The largest pairwise distance","The number of points","The average label","The smallest pairwise distance"], answer:3, explain:"Single link 取两个簇之间最近的点；Complete link 才取最远的点。" },
  { id:"day3mc09", type:"choice", topic:"Class 5 · 距离矩阵一步题", stem:"Using agglomerative clustering, which pair merges first, and under single link what is the new distance from {A,B} to C?", figure:day3DistanceFigure, choices:["A and C merge; distance = 2","A and B merge; distance = 4","B and C merge; distance = 7","A and B merge; distance = 7"], answer:1, explain:"最小距离是 d(A,B)=2，所以先合并 A、B。Single link 到 C 取 min(4,7)=4。" },
  { id:"day3mc10", type:"choice", topic:"Class 5 · Dendrogram", stem:"What information does a dendrogram mainly show?", choices:["Python variable types","Only the final number of records","The order and distance at which clusters merge","A list of labelled target values"], answer:2, explain:"Dendrogram 是层次聚类的树状图，显示哪些簇先合并以及合并发生的距离。" },
  { id:"day3mc11", type:"choice", topic:"Class 5 · Support 一步题", stem:"From the transaction table, what is support(Bread ∪ Milk)?", figure:day3BasketFigure, choices:["2/5 = 0.40","2/3 ≈ 0.67","3/5 = 0.60","1/2 = 0.50"], answer:0, explain:"同时出现 Bread 和 Milk 的交易有 2 笔，总交易 5 笔，所以 support=2/5=0.40。" },
  { id:"day3mc12", type:"choice", topic:"Class 5 · Confidence 一步题", stem:"From the same table, what is confidence(Bread → Milk)?", figure:day3BasketFigure, choices:["2/5 = 0.40","3/5 = 0.60","2/3 ≈ 0.67","2/2 = 1.00"], answer:2, explain:"已知 Bread 出现时，Milk 也出现的比例是 together/Bread = 2/3。" },
  { id:"day3mc13", type:"choice", topic:"Class 5 · Lift 判断", stem:"If lift(Bread → Milk) is greater than 1, what does it suggest?", choices:["Bread and Milk have a positive association","The two items never occur together","The rule must have zero confidence","Bread is a supervised-learning label"], answer:0, explain:"Lift>1 表示正关联；=1 近似独立；<1 表示负关联或替代关系。" },
  { id:"day3mc14", type:"choice", topic:"Class 5 · Apriori 一步筛选", stem:"Minimum support count is 2. Bread appears 3 times, Milk 2 times and Eggs 1 time. Which item must be removed from the frequent 1-itemsets?", choices:["Bread","Milk","Bread and Milk","Eggs"], answer:3, explain:"Apriori 首先删除 support count 低于阈值的项。Eggs 只出现 1 次，低于 2。" },
  { id:"day3tf01", type:"tf", topic:"Class 5 · Unsupervised learning", stem:"Unsupervised learning normally works without target labels and tries to discover hidden patterns.", choices:["True","False"], answer:0, explain:"True。有没有 target label 是判断监督与无监督的第一线索。" },
  { id:"day3tf02", type:"tf", topic:"Class 5 · Fuzzy C-means", stem:"In fuzzy or overlapping clustering, every point must belong exclusively to exactly one cluster.", choices:["True","False"], answer:1, explain:"False。一个点可以按不同 membership 程度属于多个簇；K-means 才是 exclusive clustering。" },
  { id:"day3tf03", type:"tf", topic:"Class 5 · K-means", stem:"The number of clusters K must be chosen before standard K-means starts.", choices:["True","False"], answer:0, explain:"True。Elbow method 可以帮助选择较合理的 K。" },
  { id:"day3tf04", type:"tf", topic:"Class 5 · Divisive clustering", stem:"Divisive hierarchical clustering begins with each point in a separate cluster.", choices:["True","False"], answer:1, explain:"False。描述的是 agglomerative；divisive 从所有点组成的一个大簇开始向下拆分。" },
  { id:"day3tf05", type:"tf", topic:"Class 5 · Association rules", stem:"A rule with high confidence must also have high support.", choices:["True","False"], answer:1, explain:"False。X 即使很少出现，只要每次出现都伴随 Y，也可能 confidence 高但 support 很低。" },
  { id:"day3tf06", type:"tf", topic:"Class 5 · Complete link", stem:"Complete-link clustering uses the maximum pairwise distance between two clusters.", choices:["True","False"], answer:0, explain:"True。Single=min，Complete=max，Average=平均。" }
];
QUIZ_SETS.push({
  id:"day3",
  title:"Day 3 · 无监督学习原卷式专项",
  when:"第 5 课 · 20 题",
  blurb:"14 道选择＋6 道判断：以历年卷的概念辨认为主，只加入 K-means、距离矩阵和关联规则各一步小计算，不做完整多轮大题。",
  questions:day3Questions
});

// Memory challenge: replace passive repetition with action matching, classification and formula recall.
const memorySearchBoard = `<figure class="exam-figure"><div class="memory-board"><span><b>BFS</b><small>Expand level by level</small></span><span><b>DFS</b><small>Follow one branch deeply</small></span><span><b>UCS</b><small>min g(n)</small></span><span><b>Greedy</b><small>min h(n)</small></span><span><b>A*</b><small>min g(n)+h(n)</small></span><span><b>IDS</b><small>Repeat DLS with deeper limits</small></span></div><figcaption>Cover the algorithm names mentally and recall each one from its action.</figcaption></figure>`;
const memoryAlgorithmBoard = `<figure class="exam-figure"><div class="memory-board algorithm-board"><span><b>Classification</b><small>Predict a discrete class</small></span><span><b>Regression</b><small>Predict a continuous value</small></span><span><b>Unsupervised Learning</b><small>Find structure without labels</small></span><span><b>Reinforcement Learning</b><small>Learn actions from rewards</small></span></div><figcaption>Choose the learning type from labels or rewards, then choose the task from the required output.</figcaption></figure>`;
const memoryFormulaBoard = `<figure class="exam-figure"><div class="memory-board formula-board"><span><b>Precision</b><small>TP / (TP + FP)</small></span><span><b>Recall</b><small>TP / (TP + FN)</small></span><span><b>F1</b><small>2PR / (P + R)</small></span><span><b>Support</b><small>XY / All</small></span><span><b>Confidence</b><small>XY / X</small></span><span><b>Lift</b><small>Confidence / Support(Y)</small></span></div><figcaption>Identify the denominator first, and then substitute the numbers.</figcaption></figure>`;
const memoryQuestions = [
  { id:"mem01", type:"choice", topic:"Matching 1/6 · Search behaviour", stem:"Which algorithm searches breadthwise by expanding nodes level by level?", figure:memorySearchBoard, choices:["DFS","BFS","UCS","Greedy Best-First Search"], answer:1, explain:"BFS stands for Breadth-First Search. It expands all nodes at the current depth before moving to the next level." },
  { id:"mem02", type:"choice", topic:"Matching 2/6 · Search behaviour", stem:"Which algorithm always selects the node with the smallest accumulated path cost g(n)?", figure:memorySearchBoard, choices:["A*","Greedy Best-First Search","UCS","IDS"], answer:2, explain:"Uniform-Cost Search uses the actual accumulated path cost g(n). A* also considers the estimated remaining cost h(n)." },
  { id:"mem03", type:"choice", topic:"Matching 3/6 · Search behaviour", stem:"Which algorithm selects a node using only the heuristic estimate h(n)?", figure:memorySearchBoard, choices:["Greedy Best-First Search","BFS","DLS","UCS"], answer:0, explain:"Greedy Best-First Search uses h(n) only. It may be fast, but it does not always return the least-cost path." },
  { id:"mem04", type:"choice", topic:"Matching 4/6 · Search formula", stem:"Which algorithm uses the evaluation function f(n) = g(n) + h(n)?", figure:memorySearchBoard, choices:["DFS","A*","Bidirectional Search","BFS"], answer:1, explain:"A* combines the path cost already incurred, g(n), with the estimated remaining cost, h(n)." },
  { id:"mem05", type:"choice", topic:"Matching 5/6 · DFS variant", stem:"Which strategy repeatedly runs depth-limited search with limits 0, 1, 2, and so on?", figure:memorySearchBoard, choices:["UCS","Greedy Best-First Search","IDS","Bidirectional Search"], answer:2, explain:"Iterative Deepening Search repeatedly performs depth-limited search while gradually increasing the depth limit." },
  { id:"mem06", type:"choice", topic:"Matching 6/6 · Two-front search", stem:"Which strategy searches forward from the start and backward from a known goal until the two frontiers meet?", choices:["DLS","Bidirectional Search","DFS","A*"], answer:1, explain:"Bidirectional Search requires a clearly defined goal and a way to search backward from that goal." },

  { id:"mem07", type:"choice", topic:"Classification 1/6 · Supervised learning", stem:"Under which learning type and task should Logistic Regression be classified?", figure:memoryAlgorithmBoard, choices:["Supervised Learning → Regression","Unsupervised Learning → Clustering","Supervised Learning → Classification","Reinforcement Learning → On-policy"], answer:2, explain:"Despite its name, Logistic Regression normally estimates class probabilities and is used for classification." },
  { id:"mem08", type:"choice", topic:"Classification 2/6 · Continuous output", stem:"Which task is most suitable for Linear Regression?", figure:memoryAlgorithmBoard, choices:["Predicting a continuous house price","Grouping similar customers","Finding market-basket associations","Selecting actions from rewards"], answer:0, explain:"Regression predicts a continuous numerical value, such as a house price, sales volume, or temperature." },
  { id:"mem09", type:"choice", topic:"Classification 3/6 · Dual-purpose algorithm", stem:"Which algorithm in the course can be used for both classification and regression?", choices:["Apriori","Random Forest","K-means","Q-learning"], answer:1, explain:"Random Forest uses voting for classification and averages numerical predictions for regression." },
  { id:"mem10", type:"choice", topic:"Classification 4/6 · Unsupervised clustering", stem:"Which algorithm is suitable for grouping similar customers when no target labels are available?", figure:memoryAlgorithmBoard, choices:["K-means","Logistic Regression","Linear Regression","SARSA"], answer:0, explain:"No labels plus a grouping task indicates clustering. K-means is the main clustering algorithm in this course." },
  { id:"mem11", type:"choice", topic:"Classification 5/6 · Association rules", stem:"Which algorithm is used to discover products that frequently occur together?", choices:["SVM","Apriori","Decision Tree","KNN"], answer:1, explain:"Apriori first identifies frequent itemsets using support and then generates association rules." },
  { id:"mem12", type:"choice", topic:"Classification 6/6 · Reinforcement learning", stem:"An agent repeatedly tries actions and receives rewards or penalties. Which learning type is this?", figure:memoryAlgorithmBoard, choices:["Supervised Learning","Unsupervised Learning","Reinforcement Learning","Regression"], answer:2, explain:"The key clue for Reinforcement Learning is that an agent updates its policy using rewards or penalties received after actions." },

  { id:"mem13", type:"choice", topic:"Formula 1/6 · Precision", stem:"Which formula measures the proportion of predicted positive cases that are actually positive?", figure:memoryFormulaBoard, choices:["TP/(TP+FN)","(TP+TN)/All","TP/(TP+FP)","2PR/(P+R)"], answer:2, explain:"The denominator of Precision is all predicted positive cases: TP + FP." },
  { id:"mem14", type:"choice", topic:"Formula 2/6 · Recall", stem:"Which formula measures the proportion of actual positive cases that the model successfully identifies?", figure:memoryFormulaBoard, choices:["TP/(TP+FN)","TP/(TP+FP)","TN/(TN+FP)","XY/All"], answer:0, explain:"The denominator of Recall is all actual positive cases: TP + FN. False negatives are the positive cases that were missed." },
  { id:"mem15", type:"choice", topic:"Formula 3/6 · Confusion-matrix calculation", stem:"According to the matrix, what are the Precision and Recall values needed to calculate F1?", figure:day2ConfusionFigure, choices:["0.90 and 0.75","0.75 and 0.90","0.84 and 0.75","0.80 and 0.92"], answer:1, explain:"Precision = 18/(18+6) = 0.75 and Recall = 18/(18+2) = 0.90. F1 can then be calculated using 2PR/(P+R)." },
  { id:"mem16", type:"choice", topic:"Formula 4/6 · Support", stem:"Bread and Milk occur together in 2 of 5 transactions. What is support(Bread ∪ Milk)?", figure:day3BasketFigure, choices:["2/3","3/5","2/5","2/2"], answer:2, explain:"Support is the number of transactions containing both items divided by all transactions: 2/5 = 0.40." },
  { id:"mem17", type:"choice", topic:"Formula 5/6 · Confidence", stem:"Bread appears in 3 transactions, and 2 of them also contain Milk. What is confidence(Bread → Milk)?", figure:day3BasketFigure, choices:["2/5","2/3","3/5","2/2"], answer:1, explain:"For confidence(X → Y), the denominator is the number of transactions containing X. Therefore, the answer is 2/3." },
  { id:"mem18", type:"choice", topic:"Formula 6/6 · Lift", stem:"If confidence(Bread → Milk) = 2/3 and support(Milk) = 2/5, what is the approximate lift and its interpretation?", figure:memoryFormulaBoard, choices:["0.40, negative association","0.67, independence","1.00, positive association","1.67, positive association"], answer:3, explain:"Lift = (2/3)/(2/5) = 5/3 ≈ 1.67. A lift greater than 1 indicates a positive association." }
];
QUIZ_SETS.push({
  id:"memory",
  title:"Memory Challenge · Matching and Formula Recall",
  when:"Search strategies · Algorithm classification · Formula recall",
  blurb:"Complete 18 short rounds: match search behaviours, place algorithms in the correct learning category and task, and recall formulas for confusion matrices and association rules. Every answer includes an explanation.",
  questions:memoryQuestions
});
