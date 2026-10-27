# -*- coding: utf-8 -*-
"""Build questions.js from lecture, Lab 1, and Homework 2 facts."""
import io
import json
import random
import contextlib
from pathlib import Path

def run(code):
    buf = io.StringIO()
    ns = {}
    with contextlib.redirect_stdout(buf):
        exec(code, ns, ns)
    return buf.getvalue().rstrip("\n")

def choice(topic, stem, choices, answer, explain, code=None):
    q = {"topic": topic, "stem": stem, "choices": choices, "answer": answer, "explain": explain}
    if code:
        q["code"] = code
    return q

def short(topic, stem, model, explain):
    return {"topic": topic, "stem": stem, "model": model, "explain": explain}

def output(topic, stem, code, explain):
    return {"topic": topic, "stem": stem, "code": code, "expect": run(code), "explain": explain}

def draw(topic, stem, reference, explain):
    return {"topic": topic, "stem": stem, "reference": reference, "explain": explain}

choices = [
choice("What a programming language is",
"Which statement matches Lecture 1?",
["A programming language is a set of written symbols and rules that tell the hardware to perform tasks.",
 "A programming language is the same thing as an operating system.",
 "A programming language is only the .exe file.",
 "A programming language must be written in binary by the programmer."],
0,
"The opening definition is symbols and rules that instruct the hardware."),
choice("System and application programs",
"Which pair matches the lecture's two program categories?",
["A word processor is a system program, and a compiler is an application program.",
 "Compilers and operating systems are system programs. Word processors and spreadsheets are application programs.",
 "Both compilers and word processors are system programs.",
 "An application program is written only for the operating system, never for a user."],
1,
"System programs serve the computer system. Application programs serve users."),
choice("Compiler",
"What does a compiler do, and which languages does the slide give as examples?",
["It translates the whole source program into machine code before execution. Examples: C, C#, and C++.",
 "It translates one line at a time while the program runs. Examples: Python and Ruby.",
 "It only links .obj files into an .exe.",
 "It finds logical errors after the program has printed a wrong answer."],
0,
"A compiler finishes translation before the run, so no translation happens during execution. The slide's interpreter examples are Python, Ruby, and JavaScript."),
choice("Interpreter",
"What does an interpreter do?",
["It translates the entire program first, then runs the machine code.",
 "It translates code line by line during execution, which makes errors easier to notice but can slow the program down.",
 "It joins libraries into one .exe file.",
 "It stores only the source program and never translates it."],
1,
"The slide spells the word Interpretator. The meaning is an interpreter. Python is in this group."),
choice("Source, object, and executable files",
"Which extensions does the lecture give?",
["Source .exe, object .py, executable .obj",
 "Object program usually .obj, executable program usually .exe",
 "Object program usually .exe, executable program usually .obj",
 "Both the object program and the executable program use .py"],
1,
"The source program is the code the programmer writes. The object program is the compiler's machine-language translation. The executable is the linker's output."),
choice("Linker",
"What does the linker do?",
["It checks English grammar in the comments.",
 "It pulls modules and libraries together and resolves references so the program can run.",
 "It translates Python one line at a time.",
 "It splits one array into several smaller arrays."],
1,
"Even a small program uses library code. The linker is the program that joins those pieces."),
choice("Three kinds of errors",
"A program divides by zero and crashes while it is running. Which error is that?",
["Syntax error", "Logical error", "Run-time error", "Linker error"],
2,
"The lecture lists divide by zero and invalid input as run-time errors. A syntax error is bad grammar. A logical error runs and gives a wrong result, such as incorrect parentheses."),
choice("Programming process",
"Which three phases does the lecture say all matter?",
["Design, marketing, and sales",
 "Problem identification and solving, implementation, and maintenance",
 "Training, testing, and deployment only",
 "Fetch, decode, and execute"],
1,
"Fetch, decode, and execute are CPU steps, not the three phases of programming work."),
choice("Early programming languages",
"When does the lecture say the first programming languages were developed?",
["In the 1950s", "In 1965 at Stanford", "In 1970 for MYCIN", "In 1997, when Deep Blue played chess"],
0,
"The point of that slide is that languages changed as better designs appeared, and different languages suit different programs."),
choice("Names and types",
"Which statement matches the Python lecture and Lab 1?",
["Variable names ignore uppercase and lowercase.",
 "A variable name is case-sensitive, and type() reports the type of a value.",
 "type() changes an integer into a string.",
 "A variable can be created only with the var keyword."],
1,
"Lab 1 uses type() on numbers, strings, and other values. The same name with different capitalization is a different variable."),
choice("Arithmetic operators",
"Which operator is floor division, and which operator is the remainder?",
["/ is floor division and // is the remainder",
 "// is floor division and % is the remainder",
 "% is floor division and ** is the remainder",
 "** is floor division and / is the remainder"],
1,
"/ is ordinary division and gives a float. ** is exponentiation. Lab 1 practices all four."),
choice("Boolean operators",
"Lab 1 practices logical operators. Which expression is false?",
["True and False", "True or False", "not False", "5 >= 5"],
0,
"and is true only when both sides are true. or is true when either side is true. not flips the value."),
choice("List, tuple, set, and dictionary",
"The lecture table says which collection is immutable?",
["list", "tuple", "set", "dict"],
1,
"A list is mutable and ordered. A tuple is immutable and ordered. A set is mutable, unordered, and unique. The slide also calls a dict mutable and unordered."),
choice("Why a set is used",
"The lecture gives two main reasons to use a set. What are they?",
["To keep insertion order and to store duplicate values",
 "Fast membership tests, and finding the unique items in a collection",
 "To return several values from a function",
 "To name the columns of a table"],
1,
"A set does not keep duplicates. The in operation on a set is the fast membership test on that slide."),
choice("sort and sorted",
"What is the difference between list.sort and sorted?",
["sort returns a new list and leaves the original unchanged. sorted changes the original.",
 "sort changes the original list. sorted returns a new list and leaves the original unchanged.",
 "Both always return a new tuple.",
 "Neither one can sort in descending order."],
1,
"The lecture says sort modifies the original. sorted is the function that builds a new sequence. reverse=True sorts descending."),
choice("Calling a function",
"A function is defined as def named(a, b, c). Which call fails?",
["named(5, 7, 8)", "named(a=5, b=7, c=8)", "named(5, b=7, c=8)", "named(a=5, 7, 8)"],
3,
"A keyword argument cannot be followed by a positional argument. Past finals use this as a syntax error."),
choice("Default arguments and several return values",
"Which statement matches the lecture and Lab 1?",
["A parameter cannot have a default value.",
 "A parameter may have a default, and a function may return several values by using a tuple.",
 "A function must always take at least one input.",
 "Returning two values requires two return lines and two functions."],
1,
"The lecture shows default values and named arguments. Lab 1 returns more than one value and unpacks the tuple."),
choice("break and continue",
"Both statements are allowed only inside a loop. What does each one do?",
["break skips to the next iteration. continue ends the whole loop.",
 "break ends the loop. continue ends only the current iteration and goes to the next one.",
 "Both end the whole program.",
 "Both are used only inside try."],
1,
"The lecture's break example stops when the wanted element is found. continue keeps the loop going."),
choice("try and except",
"Why does the lecture introduce try and except?",
["To make a loop run faster than NumPy",
 "An unhandled exception crashes the program. try and except handle that exception.",
 "To translate source code into an .obj file",
 "To split a DataFrame into training and test rows"],
1,
"The examples include invalid operations such as dividing by zero."),
choice("Jupyter in Lab 1",
"In command mode, which key presses match the lab?",
["Shift-Enter runs the cell. m makes the cell Markdown. y makes it code. a inserts above. b inserts below. dd deletes.",
 "Shift-Enter deletes the cell. m runs every cell. y inserts a plot.",
 "Enter switches to command mode. Esc runs the cell.",
 "dd saves the notebook and b restarts the kernel."],
0,
"Esc leaves edit mode and returns to command mode. Kernel → Restart & Clear Output clears results. Kernel → Restart & Run All runs every cell."),
choice("NumPy",
"What is NumPy, and how does the lecture tell you to import it?",
["A 2D plotting package, imported as plt",
 "Numerical Python, the basic package for scientific arrays, imported as import numpy as np",
 "A table package with labeled columns, imported as pd",
 "An expert-system engine, imported as knowledge_engine"],
1,
"The slide's np.arrange is a misspelling. The function that behaves like range is np.arange."),
choice("arange and linspace",
"How do np.arange and np.linspace treat the end of the interval?",
["Both exclude the end value.",
 "arange excludes the stop value, like range. linspace includes both endpoints.",
 "arange includes both endpoints. linspace excludes the stop.",
 "Both always return a Python list."],
1,
"np.random.seed makes later random arrays repeat, which the lecture recommends while debugging."),
choice("Array attributes",
"An array has 2 blocks, each 2 rows by 2 columns, so it holds 8 numbers. Which attributes are correct?",
["ndim is 8, shape is 2, size is (2, 2, 2)",
 "ndim is 3, shape is (2, 2, 2), size is 8",
 "ndim is 2, shape is (8,), size is 3",
 "ndim is the name of axis 0"],
1,
"ndim counts dimensions, shape gives the length of each dimension, and size counts the elements."),
choice("axis",
"For a 2D array, what does sum(axis=0) do?",
["It adds across each row and returns one number per row.",
 "It adds down each column and returns one number per column.",
 "It always returns one number for the whole array.",
 "It adds a new dimension."],
1,
"axis=1 adds across a row. The same axes are used by mean, min, and max."),
choice("concatenate, stack, and split",
"Which statement matches the lecture?",
["concatenate adds a new dimension. stack keeps the old number of dimensions.",
 "concatenate joins along an existing axis and keeps the number of dimensions. stack builds a higher-dimensional array. split is the inverse of concatenate.",
 "stack only works on Python lists.",
 "split sorts an array."],
1,
"Arrays must be reshaped to the same number of dimensions before concatenate can join them."),
choice("Reshape, fancy indexing, and masking",
"Which statement is correct?",
["reshape may change how many elements the array has.",
 "reshape keeps the same elements in a new shape. Fancy indexing uses a list of positions. A Boolean mask keeps the elements where the condition is true.",
 "Fancy indexing can select only the first element.",
 "A mask always returns True or False and never the values."],
1,
"One-dimensional indexing works like a list. Slicing can be applied on each axis of a higher-dimensional array."),
choice("Broadcasting and argsort",
"What do broadcasting and argsort do?",
["Broadcasting stretches arrays toward the same shape, then does the operation element by element. argsort returns the indices of the sorted order.",
 "Broadcasting always multiplies matrices. argsort returns the sorted values.",
 "Broadcasting removes duplicate rows. argsort splits an array.",
 "Both functions change the original Python list in place."],
0,
"The lecture's speed argument is that a Python loop rechecks types, while NumPy runs one compiled operation over same-type data. Use NumPy's sum, not a Python loop, on an array."),
choice("Choosing a Matplotlib plot",
"Which plot matches the lecture's use?",
["A histogram compares named groups, and a bar chart shows a distribution.",
 "A bar chart compares groups. A histogram shows a distribution. A scatter plot shows a relationship. A pie chart shows proportions.",
 "A scatter plot is only for proportions of one whole.",
 "A stack plot is the same thing as a pie chart."],
1,
"Matplotlib is the 2D plotting library built on NumPy. subplot places several plots in one figure. Two lines can share one axes."),
choice("NumPy and SciPy",
"How does the lecture separate NumPy and SciPy?",
["They are unrelated. SciPy does not use arrays.",
 "Both are for numerical work. NumPy provides the array and basic operations such as sorting and indexing. SciPy, built on NumPy, provides the scientific functions.",
 "SciPy is only a plotting package.",
 "NumPy is only for reading csv files."],
1,
"SciPy subpackages on the slide include integrate, fftpack, linalg, optimize, interpolate, special, and stats."),
choice("SciPy jobs",
"Which module matches the lecture's job?",
["quad, a numerical integral, belongs to integrate. Fourier transforms belong to fftpack. A matrix inverse belongs to linalg. Minimizing a function belongs to optimize.",
 "quad belongs to fftpack. Fourier transforms belong to pandas.",
 "Interpolation builds a random train/test split.",
 "Curve fitting is another name for a pie chart."],
0,
"A lambda is an anonymous function for one use. Interpolation builds new points inside known data. Curve fitting builds a curve through data; the slide's spring example is a cosine."),
choice("DataFrame and Series",
"Which statement matches the Pandas lecture?",
["A DataFrame is a one-dimensional list, and a Series is a painted bar chart.",
 "A DataFrame is a two-dimensional table with named columns, built on NumPy. Each column is a Series. Series.values is the NumPy array.",
 "loc uses integer positions and iloc uses column names.",
 "shape[0] is the number of columns."],
1,
"loc selects by label. iloc selects by integer position, like NumPy. shape[0] is the row count and shape[1] is the column count. A comment on the random-split slide says the opposite about shape[0]; that comment is wrong."),
choice("Ways to build a DataFrame",
"The lecture shows three constructions. Which one is not among them?",
["From a NumPy array, with row and column labels given",
 "From a dictionary whose keys are column names",
 "From a list of rows",
 "From a PyKE .kfb fact file"],
3,
"The lecture recommends loc and iloc rather than casual indexing. drop removes a column. A new column can be assigned by name."),
choice("Homework 2 table operations",
"Weather History uses the real column Temperature (C). Which line matches the homework?",
["df.head(6) shows the first 6 rows. df.tail(3) shows the last 3 rows. df.shape is (rows, columns).",
 "df.head(6) shows the last 6 rows.",
 "df.isnull() fills every missing cell with 0.",
 "The temperature column is spelled Temperatue, as in the question sheet."],
0,
"The question sheet misspells the column. The file uses Temperature (C), Apparent Temperature (C), Humidity, Wind Speed (km/h), Summary, and Precip Type."),
choice("Missing values and categories",
"Which Homework 2 tool does which job?",
["isnull().sum() counts missing values. dropna() removes rows that contain a missing value. nunique() counts distinct values. value_counts() counts rows in each category.",
 "dropna() counts distinct Summary values. nunique() deletes a column.",
 "value_counts() reads the csv file.",
 "describe() draws a pie chart."],
0,
"df.describe() summarizes numeric columns. df.columns lists the column names. Selecting two columns uses df[[\"Temperature (C)\", \"Apparent Temperature (C)\"]]."),
choice("Homework 2 plots",
"What do the homework imports and the two plots do?",
["import seaborn as sns and import matplotlib.pyplot as plt. %matplotlib inline draws the figure under the cell. The temperature figure is a scatter plot titled Apparent Temperature vs Temperature. The Summary figure is a bar chart titled Summary.",
 "sns is imported as pd. The temperature figure is a pie chart.",
 "%matplotlib inline saves the figure as an .exe file.",
 "A scatter plot is used to count missing values."],
0,
"read_csv loads weatherHistory.csv into a DataFrame. The filter df[df[\"Temperature (C)\"] > 35] keeps hot rows, and the homework then shows three chosen columns."),
choice("What the lecture calls AI",
"Which definition matches the lecture's short definition of AI?",
["The simulation of human intelligence by machines",
 "Any program that reads a csv file",
 "Only a neural network with backpropagation",
 "A linker that resolves library references"],
0,
"The four views on the slide are thinking humanly, thinking rationally, acting humanly, and acting rationally. Those two axes are reasoning versus action, and human standards versus rationality."),
choice("Search problem",
"In the lecture's search examples, what is a state space?",
["The set of possible states of the problem",
 "The .exe file produced by the linker",
 "The test set, which is the last 20% of the rows",
 "The knowledge question base, .kqb"],
0,
"A state describes the current situation, such as a city or the tiles of the 8-puzzle. Search starts from an initial state and looks for a goal. Uninformed search has no estimate of the distance to the goal. Informed search uses one."),
choice("Breadth-first search",
"Which line matches the BFS slide?",
["Complete: not guaranteed. It stores only one path.",
 "Complete: yes. It expands every node at depth d before depth d+1. Cost optimality is not guaranteed.",
 "It expands the deepest node first.",
 "It is optimal for every different edge cost because the shallowest goal is always the cheapest."],
1,
"The shallowest goal is not the cheapest when step costs differ. That is why uniform-cost search exists. Time and space both grow with the nodes out to the solution depth."),
choice("Uniform-cost search",
"How does uniform-cost search choose the next node?",
["It expands the lowest path cost g so far. If two path costs are equal, it chooses the alphabetically smaller path.",
 "It expands the node with the smallest h and ignores g.",
 "It stops at the first goal it generates, even if a cheaper node is still in the queue.",
 "It stores only one path and may run forever on a deep branch."],
0,
"In the lecture's worked example, S→B→G costs 10 and S→A→G costs 11. The search does not stop when it first sees the cost-11 goal, because a cheaper node is still waiting. It returns S→B→G."),
choice("Depth-first, depth-limited, and iterative deepening",
"Which statement matches the slides?",
["DFS is always complete and always cost-optimal.",
 "DFS expands a deepest node and is not guaranteed complete. It can miss a shallow solution on a very deep tree. Depth-limited search adds a depth limit. Iterative deepening raises that limit one step at a time and repeats the earlier work.",
 "Iterative deepening never repeats a node from a previous limit.",
 "Depth-limited search starts from the goal and from the start at the same time."],
1,
"The DFS advantage slide says memory stays modest because only one path, plus unexpanded siblings, is stored."),
choice("Bidirectional search",
"When does the lecture say bidirectional search can be used?",
["When the goal state is known in advance. One search starts at the initial state and one starts at the goal. They stop when they meet.",
 "When the goal is unknown and the tree may be infinite.",
 "Only when every edge cost is different.",
 "It replaces the heuristic h with a random number."],
0,
"Each side may itself use BFS, DFS, or depth-limited search. Two smaller searches replace one search across the whole graph."),
choice("Greedy search and A*",
"What does each informed method minimize?",
["Greedy search minimizes h(n), the estimated cost from n to the goal. A* minimizes f(n) = g(n) + h(n). Uniform-cost search minimizes g(n) only.",
 "Greedy search minimizes g(n). A* minimizes h(n) only.",
 "A* ignores both g and h and expands the shallowest node.",
 "h(n) must be larger than the true remaining cost."],
0,
"h(n) is 0 at a goal. A useful h must not overestimate the true remaining cost. For the 8-puzzle, h1 counts misplaced tiles and h2 adds Manhattan distances. The slide shows h2 dominates h1, and the larger admissible heuristic is the better one."),
choice("Expert system",
"Which facts match the expert-system lecture?",
["Edward Feigenbaum introduced expert systems around 1965 at Stanford. An expert system is a knowledge-based program that asks questions and simulates an expert's judgment.",
 "Expert systems were introduced in 1950 as a kind of compiler.",
 "An expert system is trained by gradient descent on unlabeled pictures.",
 "MYCIN is a clustering algorithm."],
0,
"MYCIN, from Stanford in the 1970s, diagnosed illness with IF-THEN rules and certainty factors. The components are the knowledge base, the inference engine, and the user interface."),
choice("Forward chaining, backward chaining, shallow and deep",
"Which contrast matches the lecture?",
["Forward chaining starts from data and applies rules toward a conclusion. Backward chaining starts from a goal and looks for support. A shallow system lacks causal knowledge. A deep system has it.",
 "Forward chaining starts from the goal. Backward chaining never uses rules.",
 "A shallow system is the one that stores causal knowledge.",
 "Both methods are written with foreach and assert."],
0,
"The lecture's advantages: answers outside the user's experience, help where an expert is weak, consistent answers, and they do not forget a question. Disadvantages: no common sense, errors in the rules produce errors in the result, they do not adapt by themselves, and they are expensive to build."),
choice("PyKE facts, rules, and questions",
"Which file and keyword pairing matches the lecture?",
[".kfb facts, .krb rules, .kqb questions. Forward rules use foreach and assert. Backward rules use use and when.",
 ".kfb questions, .krb facts, .kqb plots. Both directions use if and then only.",
 ".csv facts, .png rules, .exe questions.",
 "Forward rules use use and when. Backward rules use foreach and assert."],
0,
"Case-specific facts are deleted when the engine is reset. Universal facts are kept. One .krb file may contain both kinds of rule."),
choice("PyKE patterns",
"What do $name and $_name mean?",
["$name is a pattern variable that can be bound. $_name is anonymous and is never bound.",
 "$_name is bound, and $name is a comment.",
 "Both are literal facts and match only themselves.",
 "A statement's argument order does not change its meaning."],
0,
"A statement has a knowledge-base name, an entity, and arguments. family.son_of(Bruce, Thomas, Norma) means Bruce is the son of father Thomas and mother Norma. A literal pattern matches only itself. If a premise fails, backtracking returns to the previous premise."),
choice("Machine learning, deep learning, and the three types",
"Which grouping matches Lecture 4?",
["Machine learning is a subset of AI that improves from experience. Deep learning is a kind of machine learning inspired by neurons. Supervised learning uses labels. Unsupervised learning does not. Reinforcement learning uses feedback.",
 "Deep learning is the parent of AI, and machine learning is a pie chart.",
 "K-Means is supervised. Linear regression is unsupervised.",
 "Q-Learning is an unsupervised clustering method."],
0,
"Herbert Simon: learning is any process by which a system improves its performance from experience. Supervised names on the slides: linear regression, logistic regression, decision tree, random forest, Naive Bayes, KNN, SVM. Unsupervised: K-Means, Apriori, C-Means. Reinforcement: Q-Learning and SARSA."),
choice("Splitting a data set",
"What does the lecture intend by a serial split and a random split?",
["Serial split puts the first 80% of rows in training and the last 20% in test. Random split uses train_test_split with test_size=0.2. random_state repeats the same random choice.",
 "Serial split shuffles every row. Random split always keeps the first 80%.",
 "The test set is used to train the model.",
 "shape[0] is the column count, so 80% means 80% of the columns."],
0,
"The printed serial-split code starts iloc at 1, so it skips row 0, and the test line is not a valid slice. The intended rule is still first 80% / last 20%. The slide imports train_test_split from sklearn.cross_validation. Current scikit-learn uses sklearn.model_selection."),
choice("Imbalance and K-fold",
"The apple-and-pear slide and the K-fold slide say what?",
["If almost every training row is an apple, the model learns to call everything an apple. The lecture calls this overfitting. K-fold cuts the data into K equal parts, trains on K-1, validates on the remaining part, rotates, and averages the accuracy.",
 "Imbalance is solved by deleting the test set.",
 "K-fold uses one split and never repeats.",
 "K-fold is another name for uniform-cost search."],
0,
"A validation set is for estimating accuracy and adjusting training. The test set is held out from that adjustment."),
choice("Linear regression and logistic regression",
"Which contrast matches the lecture?",
["Linear regression predicts a number with a best-fit line found by minimizing distances to the line. Logistic regression classifies. Its curve is the sigmoid, and the cutoff on the slide is 0.5.",
 "Logistic regression predicts salary from years of experience with a straight line.",
 "Linear regression uses a cutoff of 0.5 to decide a class.",
 "Both methods are unsupervised."],
0,
"The lecture's linear example predicts salary from years of experience. The logistic example predicts whether a person buys a car. MAE averages absolute errors. Feature scaling normalizes feature ranges before fitting."),
choice("Confusion matrix",
"A test has 90 healthy people and 10 unhealthy people. The model calls everyone healthy. Accuracy is 90%. What does the lecture conclude?",
["Accuracy is excellent, so the model is ready for diagnosis.",
 "Accuracy can look high on an imbalanced set while every unhealthy person is missed. Precision is TP/(TP+FP). Recall is TP/(TP+FN). F1 is 2*precision*recall/(precision+recall).",
 "Precision is TP/(TP+FN).",
 "F1 uses only the true negatives."],
1,
"The slide's accuracy is (TP+TN)/(P+N). The misclassification rate is (FP+FN)/(P+N). In the car-buying example those two numbers are 0.87 and 0.13."),
choice("Decision tree, random forest, KNN, and SVM",
"Which description matches the lecture?",
["One decision tree draws decisions from conditions. A random forest builds many trees and merges them, which is more stable. KNN classifies a new point from its K nearest stored cases. An SVM separates classes with a hyperplane; support vectors are the points on the margin; a kernel lifts data that are not separable in the original dimension.",
 "A random forest is one tree and therefore overfits less than a forest.",
 "KNN throws away the training cases and keeps only a straight line.",
 "An SVM kernel reduces every problem to one dimension and removes the hyperplane."],
0,
"The lecture says one tree on a huge set can overfit, which is a reason to use a forest. K is the number of neighbors. SVM examples include face detection."),
choice("Naive Bayes",
"Which Naive Bayes type matches the lecture?",
["Gaussian assumes a normal distribution. Multinomial uses discrete counts. Bernoulli uses binary features, such as whether a word occurs in a document.",
 "Gaussian is for binary word counts. Bernoulli assumes a normal curve.",
 "All three require the data to be unlabeled.",
 "Naive Bayes is a reinforcement-learning algorithm."],
0,
"The lecture's applications include news categories, spam filtering, and weather prediction. The Iris example fits a Gaussian Naive Bayes model. Scikit-learn is the toolkit used for these algorithms."),
]

shorts = [
short("Three kinds of errors",
"Explain a syntax error, a logical error, and a run-time error. Give one example of each from the lecture.",
"A syntax error breaks the grammar, so the program does not really run. Example: a missing colon, or a keyword argument placed before a positional argument.\nA logical error runs and finishes, but the result is wrong. Example: incorrect parentheses, so an average is computed as x + y / 2.\nA run-time error crashes during execution. Example: division by zero, or invalid input.",
"The May 2024 final asked for these three with examples."),
short("Four collections",
"Using the lecture table, compare a list, a tuple, a set, and a dictionary. For each one, say whether it is mutable and whether the lecture calls it ordered.",
"A list, written with square brackets, is mutable and ordered. Duplicates are allowed.\nA tuple, written with parentheses, is immutable and ordered. It is also how a function returns several values.\nA set, written with curly brackets, is mutable and unordered. It keeps unique items and is used for fast membership tests.\nA dictionary maps keys to values. The lecture table calls it mutable and unordered. Lab 1 also says keys are not duplicated.",
"Answer this from the lecture table. Later Python versions remember dict insertion order, but the slide's answer is unordered."),
short("Source, object, executable, linker",
"Explain a source program, an object program, and an executable program. What does the linker do?",
"The source program is what the programmer writes. It can be compiled or interpreted.\nThe object program is the compiler's output: the machine-language translation of that source. The extension is usually .obj.\nThe executable program is the output of the linker. The extension is usually .exe. It is the machine-language program joined with the libraries and other files it needs.\nThe linker pulls the modules and libraries together and resolves references between them.",
"Keep the three names and the two extensions separate. The December 2025 final asked this group."),
short("Compiler and interpreter",
"Compare a compiler with an interpreter. Give the lecture's example languages.",
"A compiler translates the entire source into machine code before execution, so the run itself does not translate. The slide's examples are C, C#, and C++.\nAn interpreter translates line by line during execution. That makes errors easier to notice and can slow the program. The slide's examples are Python, Ruby, and JavaScript.",
"The slide spells interpreter as Interpretator."),
short("append, extend, sort, and a slice",
"Explain append versus extend, and sort versus a slice. You do not need to give a numeric output.",
"append adds one object at the end. If that object is a list, the inner list stays as a single element.\nextend adds each element of the other list.\nsort changes the original list. A slice [m:n] starts at m and stops before n. The original list's later elements are not copied into the slice.\nsorted, unlike sort, returns a new list.",
"Lab 1 also uses pop to remove the last element, + to build a new list, and in to test membership."),
short("break, continue, and exceptions",
"Explain break, continue, and try/except.",
"break is allowed only in a loop. It ends the loop, for example when the wanted element has been found.\ncontinue is also allowed only in a loop. It ends the current iteration and moves to the next one.\nAn exception such as dividing by zero crashes the program if nothing handles it. try and except catch that exception.",
"Do not swap break and continue. That swap is a common exam mistake."),
short("concatenate and stack",
"Explain concatenate, stack, and split.",
"concatenate joins arrays along an existing axis. The default axis is 0. The number of dimensions stays the same. Arrays of different dimensions must be reshaped to the same number of dimensions first.\nstack builds a higher-dimensional array from lower-dimensional arrays, so the result has one more dimension.\nsplit is the inverse of concatenate. It can use a count or explicit index positions.",
"A final paper asked for concatenate versus stack directly."),
short("loc, iloc, and shape",
"Explain loc, iloc, and DataFrame.shape. Mention the incorrect comment on the random-split slide.",
"loc selects by the label you assigned. iloc selects by integer position, counting from 0, in the same way as a NumPy array.\nshape is (number of rows, number of columns). shape[0] is the row count. shape[1] is the column count.\nThe random-split slide comments that shape[0] is the number of columns. That comment does not match the code, which correctly reads the column count from shape[1].",
"Homework 2 uses shape for the size of weatherHistory, and iloc-style positions when it displays selected rows."),
short("Plots",
"Say when the lecture uses a bar chart, a histogram, a scatter plot, a pie chart, and a stack plot.",
"A bar chart compares groups, especially when the differences are large.\nA histogram shows the distribution of a data set with vertical bars.\nA scatter plot shows the relationship between variables.\nA pie chart shows numerical proportions of a whole.\nA stack plot, also called an area plot, shows the whole of several stacked series.\nsubplot places several of these plots in one figure.",
"Homework 2 uses a scatter plot titled Apparent Temperature vs Temperature and a bar chart titled Summary."),
short("NumPy and SciPy",
"Compare NumPy with SciPy, and name the SciPy subpackage for integration, Fourier transforms, linear algebra, optimization, and interpolation.",
"NumPy stores arrays and does basic work such as indexing, sorting, and element-wise arithmetic.\nSciPy is built on NumPy and holds the fuller scientific functions.\nIntegration, including quad, is in integrate. Fourier transforms are in fftpack. Linear algebra, including an inverse, is in linalg. Minimizing a function is in optimize. Interpolation is in interpolate.\nA lambda is an anonymous function for one use. Curve fitting builds a curve through known data.",
"The subpackage table also lists cluster, constants, io, ndimage, odr, signal, sparse, spatial, special, and stats."),
short("BFS and DFS",
"Compare breadth-first search with depth-first search on completeness, what is expanded next, cost, and memory.",
"Breadth-first search expands every node at the current depth before the next depth. It is complete. The lecture says cost optimality is not guaranteed, because the shallowest goal need not be the cheapest. Its time and space both grow with the nodes out to the solution depth.\nDepth-first search expands a deepest node. Completeness is not guaranteed: on a very deep or infinite branch it can miss a shallow solution. Cost optimality is not guaranteed. Memory stays modest because only one path, plus the unexpanded siblings on that path, is stored.",
"The May 2025 final asked for both traversals of a tree. The drawing questions use one shared tree."),
short("Greedy search, uniform cost, and A*",
"Compare greedy search, uniform-cost search, and A*. What must be true of h?",
"Greedy search expands the node with the smallest h(n), the estimated cost from n to the goal. It does not look at the cost already spent.\nUniform-cost search expands the smallest g(n), the path cost from the start to n. Equal costs are broken by the alphabetically smaller path. It does not stop at the first goal it generates if a cheaper node is still in the queue.\nA* expands the smallest f(n) = g(n) + h(n). That is the estimated cost of the cheapest solution through n.\nh(n) is 0 at a goal. h must not overestimate the true remaining cost. For the 8-puzzle, h1 is the number of misplaced tiles and h2 is the Manhattan distance. h2 dominates h1, and the larger heuristic is better as long as it does not overestimate.",
"The lecture's uniform-cost result is S→B→G at cost 10, which beats S→A→G at cost 11."),
short("Depth-limited, iterative deepening, and bidirectional search",
"Explain depth-limited search, iterative deepening, and bidirectional search.",
"Depth-limited search is depth-first search with a depth cutoff, so it does not follow a branch past that limit.\nIterative deepening repeats depth-limited search with a higher limit each time. It combines the modest memory of depth-first search with the level-by-level progress of breadth-first search. Its drawback is that each new limit repeats the work of the shallower limits.\nBidirectional search runs one search from the start and one from the goal. It stops when they meet. The goal must be known in advance.",
"The iterative-deepening slide shows the repeated prefixes across iterations."),
short("Expert-system reasoning",
"Explain forward chaining, backward chaining, a shallow expert system, and a deep expert system. Give two advantages and two disadvantages from the lecture.",
"Forward chaining is data-driven. It matches the input to rules and keeps going until it reaches a result.\nBackward chaining starts from a goal and asks what would have to be true to support it.\nA shallow expert system has no causal knowledge of why the rules work. A deep expert system has that causal knowledge.\nAdvantages: it can answer outside the user's own experience, and it does not forget to ask a required question.\nDisadvantages: it has no common sense, and an error in the knowledge base or the inference engine becomes an error in the result.",
"Also from the same slide: it can help a professional in a weaker area, its logical process makes answers consistent, it does not adapt to a new environment unless the knowledge base is edited, and it is expensive to build."),
short("PyKE",
"Name the three PyKE file types, the two fact lifetimes, and the keywords for forward and backward rules. Explain $ and $_.",
"Facts go in a .kfb file, rules in a .krb file, and user questions in a .kqb file.\nCase-specific facts are deleted when the engine is reset. Universal facts are kept.\nA forward rule uses foreach and assert. A backward rule uses use and when.\nA statement has a knowledge-base name, an entity, and arguments. A pattern variable starts with $ and can be bound. An anonymous variable starts with $_ and is never bound. Argument order changes the meaning.",
"The family and weather notebooks are the lecture's two worked systems. Backtracking steps back to the previous premise when the current premise fails."),
short("Training, testing, and K-fold",
"Explain the training set, the test set, a serial split, a random split, and K-fold cross-validation.",
"The training set is used to fit the model. The test set is used to measure it and is not used for training. A common split on the slide is 80% training and 20% test.\nA serial split takes the first 80% of the rows for training and the remaining 20% for test.\nA random split picks rows at random. The lecture calls train_test_split with test_size=0.2 and random_state=0.\nK-fold divides the data into K equal parts. One part is the validation set and the other K-1 parts train the model. This rotates so every part is the validation set once. The accuracies are averaged.",
"If almost all training rows are one class, the lecture says the model overfits that imbalance and predicts the majority class."),
short("Confusion-matrix measures",
"Define accuracy, precision, recall, and F1. Why does the lecture say accuracy can be misleading?",
"Accuracy is (TP+TN)/(P+N).\nPrecision is TP/(TP+FP). It falls when false positives grow.\nRecall, also called sensitivity, is TP/(TP+FN).\nF1 is 2*precision*recall/(precision+recall). It is 1 only when precision and recall are both 1.\nIn the lecture's example, 90 healthy people and 10 unhealthy people are all called healthy. Accuracy is 90%, but every unhealthy person is missed.",
"The car-buying slide computes accuracy 0.87 and misclassification rate 0.13, where the misclassification rate is (FP+FN)/(P+N)."),
short("Regression, trees, neighbors, and margins",
"In one paragraph each, describe linear regression, logistic regression, a random forest, KNN, and an SVM as the lecture does.",
"Linear regression fits a line for a numeric target by minimizing the distances from the points to the line.\nLogistic regression classifies. The lecture draws a sigmoid curve and uses a cutoff of 0.5.\nA decision tree follows conditions down to a decision. A random forest builds many trees and merges them so the result is more stable. One tree on a huge set can overfit.\nKNN stores the training cases and classifies a new case from its K nearest neighbors.\nAn SVM separates classes with a hyperplane. Support vectors lie on the margin. A kernel moves data that are not linearly separable into a higher dimension.",
"Gaussian Naive Bayes assumes a normal distribution. Multinomial Naive Bayes uses counts. Bernoulli Naive Bayes uses binary features, such as whether a word occurs."),
]

outputs = [
output("Floor division and remainder",
"Write what this code prints.",
"print(15 / 2)\nprint(15 // 2)\nprint(15 % 2)\nprint(2 ** 3)",
"Lab 1 separates / , // , % , and ** . Ordinary division of integers in Python 3 returns a float."),
output("String formatting from Lab 1",
"Write what this code prints.",
"h = 'hello'\nw = 'world'\nhw = h + ' ' + w\nhw100 = '%s %s %d' % (h, w, 100)\nprint(hw)\nprint(hw100)",
"The lab concatenates with + and then uses %s and %d formatting."),
output("Slice end is excluded",
"Write what this code prints.",
"a = [10, 20, 30, 40, 50]\nprint(a[1:4])\nprint(a[-2:])\nprint(a[:2])",
"The slice starts at the first index and stops before the second. A negative index counts from the end."),
output("sort then slice",
"Write what this code prints.",
"a = [4, 1, 7, 3, 9, 2]\na.sort(reverse=True)\nprint(a[1:4])",
"Descending sort produces [9, 7, 4, 3, 2, 1]. The slice keeps indexes 1, 2, and 3."),
output("append and extend",
"Write what this code prints.",
"a = [1, 2]\na.append([3, 4])\nb = [1, 2]\nb.extend([3, 4])\nprint(a)\nprint(b)",
"append inserts the list as one element. extend inserts each of its elements."),
output("pop and membership",
"Write what this code prints.",
"x = ['a', 'b', 'c']\nx.pop()\nprint(x)\nprint('b' in x)\nprint(len(x))",
"Lab 1 uses pop to remove the last element, in for membership, and len for the length."),
output("Dictionary lookup",
"Write what this code prints.",
"d = {'cat': 'nice', 'dog': 'friendly'}\nd['fish'] = 'wet'\nprint(d['cat'])\ndel d['fish']\nprint('fish' in d)\nprint(len(d))",
"Square brackets read or write the value for a key. del removes a key. in tests whether the key exists."),
output("if, elif, and else",
"Write what this code prints.",
"x = 0\nif x > 0:\n    print('pos')\nelif x == 0:\n    print('zero')\nelse:\n    print('neg')",
"The first true branch runs. Later branches are skipped."),
output("break and continue",
"Write what this code prints.",
"stopped = []\nfor i in [1, 2, 3, 4]:\n    if i == 3:\n        break\n    stopped.append(i)\nskipped = []\nfor i in [1, 2, 3, 4]:\n    if i == 3:\n        continue\n    skipped.append(i)\nprint(stopped)\nprint(skipped)",
"break never reaches 3 or 4. continue skips only 3."),
output("Default argument and tuple return",
"Write what this code prints.",
"def add(a, b=2):\n    return a + b\ndef sq_cube(n):\n    return n * n, n * n * n\nx, y = sq_cube(3)\nprint(add(3))\nprint(add(3, 4))\nprint(x, y)",
"The omitted second argument uses the default. Lab 1 unpacks a tuple returned from a function."),
output("arange, reshape, and axis sums",
"Write what this code prints. Copy NumPy's spacing.",
"import numpy as np\na = np.arange(6)\nprint(a)\nb = a.reshape(2, 3)\nprint(b.sum(axis=0))\nprint(b.sum(axis=1))",
"arange(6) is 0, 1, 2, 3, 4, 5 and the stop value is excluded. After reshape(2, 3), axis 0 sums each column and axis 1 sums each row."),
output("Fancy indexing and broadcasting",
"Write what this code prints. Copy NumPy's spacing.",
"import numpy as np\nm = np.array([[1, 2, 3],\n              [4, 5, 6],\n              [7, 8, 9]])\nprint(m[[0, 2], [1, 0]])\nx = np.array([1, 2, 3])\nprint(x + 4)\nprint(x[x > 1])",
"The fancy index picks row 0 column 1, then row 2 column 0. Adding a scalar stretches that scalar across the array. The mask keeps values greater than 1."),
output("Row sum from the final-paper pattern",
"Write what this code prints. Copy NumPy's spacing.",
"import numpy as np\na = np.array([[5, 6, 8, 6],\n              [4, 6, 9, 1],\n              [2, 6, 1, 9]])\nprint(a.sum(axis=1))",
"axis=1 adds across the row: 5+6+8+6=25, 4+6+9+1=20, and 2+6+1+9=18. NumPy prints spaces, not commas."),
output("concatenate, stack, and argsort",
"Write what this code prints. Copy NumPy's spacing.",
"import numpy as np\na = np.array([1, 2])\nb = np.array([3, 4])\nprint(np.concatenate([a, b]))\nprint(np.stack([a, b]).shape)\nprint(np.argsort(np.array([3, 1, 2])))",
"concatenate of two length-2 arrays is one length-4 array. stack of those two arrays has shape (2, 2). argsort returns positions, not the sorted numbers: 1 is at index 1, 2 is at index 2, and 3 is at index 0."),
output("Series loc and iloc",
"Write what this code prints.",
"import pandas as pd\ns = pd.Series(['Ann', 'Ben', 'Cara'], index=[1, 2, 3])\nprint(s.loc[1])\nprint(s.iloc[1])",
"The labels are 1, 2, and 3. loc[1] uses the label Ann. iloc[1] uses the position, which is Ben."),
output("DataFrame positions, shape, and a filter",
"Write what this code prints.",
"import pandas as pd\ndf = pd.DataFrame({'A': [10, 20, 30], 'B': [1, 2, 3]})\nprint(df.iloc[1, 0])\nprint(df.loc[0, 'B'])\nprint(df.shape)\nprint(df['A'].mean())\nhot = df[df['A'] > 15]\nprint(hot.shape[0])",
"iloc[1, 0] is the second row and first column. loc uses the index label 0 and the column name B. shape counts rows then columns. The mean prints as 20.0, with the decimal. The filter keeps the two rows whose A value is greater than 15."),
]

lang_svg = """<svg viewBox="0 0 560 250" width="100%" role="img">
<rect x="16" y="16" width="210" height="44" fill="#e7f2ec" stroke="#1f4d3a"/>
<text x="121" y="43" text-anchor="middle" font-size="13">High-level language</text>
<text x="250" y="43" font-size="13">Compilation</text>
<rect x="16" y="74" width="210" height="40" fill="#fffdf8" stroke="#1f4d3a"/>
<text x="121" y="99" text-anchor="middle" font-size="13">Assembly language</text>
<text x="250" y="99" font-size="13">Assembler</text>
<rect x="16" y="128" width="210" height="40" fill="#fffdf8" stroke="#1f4d3a"/>
<text x="121" y="153" text-anchor="middle" font-size="13">Machine language: 0s and 1s</text>
<text x="250" y="153" font-size="13">Instruction execution</text>
<rect x="16" y="182" width="210" height="40" fill="#fffdf8" stroke="#1f4d3a"/>
<text x="121" y="207" text-anchor="middle" font-size="13">Hardware: switches and gates</text>
</svg>"""

cpu_svg = """<svg viewBox="0 0 280 300" width="70%" role="img">
<g font-size="13" text-anchor="middle">
<rect x="40" y="8" width="200" height="36" fill="#e7f2ec" stroke="#1f4d3a"/><text x="140" y="31">1. Fetch an instruction</text>
<rect x="40" y="60" width="200" height="36" fill="#fffdf8" stroke="#1f4d3a"/><text x="140" y="83">2. Decode the instruction</text>
<rect x="40" y="112" width="200" height="36" fill="#fffdf8" stroke="#1f4d3a"/><text x="140" y="135">3. Retrieve data if needed</text>
<rect x="40" y="164" width="200" height="36" fill="#fffdf8" stroke="#1f4d3a"/><text x="140" y="187">4. Execute</text>
<rect x="40" y="216" width="200" height="36" fill="#fffdf8" stroke="#1f4d3a"/><text x="140" y="239">5. Store the results if needed</text>
</g>
</svg>"""

es_svg = """<svg viewBox="0 0 760 120" width="100%" role="img">
<g font-size="13" text-anchor="middle">
<rect x="8" y="36" width="120" height="48" fill="#e7f2ec" stroke="#1f4d3a"/><text x="68" y="65">User</text>
<text x="168" y="58" font-size="12">questions</text>
<rect x="210" y="28" width="140" height="64" fill="#fffdf8" stroke="#1f4d3a"/><text x="280" y="56">User</text><text x="280" y="74">interface</text>
<rect x="400" y="28" width="150" height="64" fill="#fffdf8" stroke="#1f4d3a"/><text x="475" y="56">Inference</text><text x="475" y="74">engine</text>
<rect x="600" y="28" width="150" height="64" fill="#e7f2ec" stroke="#1f4d3a"/><text x="675" y="56">Knowledge</text><text x="675" y="74">base</text>
</g>
<path d="M128 60 H210 M350 60 H400 M550 60 H600" stroke="#1f4d3a" fill="none"/>
</svg>"""

def tree_svg(numbers, title):
    labels = [("S", 230, 36, numbers[0]), ("A", 120, 120, numbers[1]), ("B", 340, 120, numbers[2]),
              ("C", 60, 196, numbers[3]), ("D", 280, 196, numbers[4]), ("G", 400, 196, numbers[5])]
    nodes = []
    for name, x, y, n in labels:
        nodes.append(
            f'<circle cx="{x}" cy="{y}" r="20" fill="#fffdf8" stroke="#1f4d3a"/>'
            f'<text x="{x}" y="{y+5}">{name} {n}</text>'
        )
    return f"""<svg viewBox="0 0 460 230" width="100%" role="img" aria-label="{title}">
<line x1="230" y1="46" x2="120" y2="110" stroke="#1f4d3a"/>
<line x1="230" y1="46" x2="340" y2="110" stroke="#1f4d3a"/>
<line x1="120" y1="124" x2="60" y2="186" stroke="#1f4d3a"/>
<line x1="340" y1="124" x2="280" y2="186" stroke="#1f4d3a"/>
<line x1="340" y1="124" x2="400" y2="186" stroke="#1f4d3a"/>
<g font-size="13" text-anchor="middle">{''.join(nodes)}</g>
</svg>"""

split_svg = """<svg viewBox="0 0 640 120" width="100%" role="img">
<rect x="20" y="30" width="440" height="56" fill="#e7f2ec" stroke="#1f4d3a"/>
<rect x="460" y="30" width="140" height="56" fill="#fffdf8" stroke="#1f4d3a"/>
<text x="240" y="63" text-anchor="middle" font-size="14">Training: first 80% of rows</text>
<text x="530" y="63" text-anchor="middle" font-size="14">Test: last 20%</text>
<text x="320" y="110" text-anchor="middle" font-size="12">Rows stay in their original order</text>
</svg>"""

kfold_svg = """<svg viewBox="0 0 680 150" width="100%" role="img">
<g font-size="13" text-anchor="middle">
<rect x="16" y="24" width="140" height="64" fill="#fffdf8" stroke="#1f4d3a"/><text x="86" y="52">Part 1</text><text x="86" y="72">training</text>
<rect x="176" y="24" width="140" height="64" fill="#e7f2ec" stroke="#1f4d3a"/><text x="246" y="52">Part 2</text><text x="246" y="72">validation</text>
<rect x="336" y="24" width="140" height="64" fill="#fffdf8" stroke="#1f4d3a"/><text x="406" y="52">Part 3</text><text x="406" y="72">training</text>
<rect x="496" y="24" width="140" height="64" fill="#fffdf8" stroke="#1f4d3a"/><text x="566" y="52">Part 4</text><text x="566" y="72">training</text>
<text x="340" y="120" font-size="13">Rotate the validation part until every part has been used, then average the accuracy</text>
</g>
</svg>"""

cm_svg = """<svg viewBox="0 0 520 180" width="100%" role="img">
<g font-size="13" text-anchor="middle">
<text x="300" y="22">Predicted positive</text>
<text x="430" y="22">Predicted negative</text>
<text x="90" y="70">Actual positive</text>
<text x="90" y="125">Actual negative</text>
<rect x="210" y="40" width="120" height="48" fill="#e7f2ec" stroke="#1f4d3a"/><text x="270" y="69">TP</text>
<rect x="350" y="40" width="140" height="48" fill="#fffdf8" stroke="#1f4d3a"/><text x="420" y="69">FN</text>
<rect x="210" y="98" width="120" height="48" fill="#fffdf8" stroke="#1f4d3a"/><text x="270" y="127">FP</text>
<rect x="350" y="98" width="140" height="48" fill="#e7f2ec" stroke="#1f4d3a"/><text x="420" y="127">TN</text>
</g>
</svg>"""

draws = [
draw("Language levels",
"Draw the four language levels from the lecture, top to bottom. Label the step between each level.",
lang_svg,
"High-level languages on the slide are Python, C++, Java, and JavaScript. Assembly uses mnemonic symbols. Machine language is binary. Hardware is switches and gates."),
draw("CPU steps",
"Draw the five steps the lecture gives for the CPU. Keep them in order.",
cpu_svg,
"The instructions are already in machine language. The five steps are fetch, decode, retrieve data if needed, execute, and store results if needed."),
draw("Expert-system components",
"Draw the expert-system structure: the user, the user interface, the inference engine, and the knowledge base. Show that questions pass between the user and the system.",
es_svg,
"The knowledge base holds facts and rules. The inference engine applies them. The user interface asks the questions and shows the result."),
draw("Breadth-first order",
"Draw this tree and number the breadth-first visit order. S has children A then B. A has child C. B has children D then G. Visit children from left to right.",
tree_svg([1, 2, 3, 4, 5, 6], "Breadth-first"),
"One depth is finished before the next, so the order is S, A, B, C, D, G."),
draw("Depth-first order",
"Draw the same tree and number the depth-first visit order. Go to the left child before the right child.",
tree_svg([1, 2, 4, 3, 5, 6], "Depth-first"),
"Depth-first goes S, A, C, then backtracks to B, D, G. The numbers are S1, A2, C3, B4, D5, G6."),
draw("Serial train and test split",
"Draw a serial 80/20 split of a table. Label which rows are training and which rows are test.",
split_svg,
"The lecture's intended serial split keeps the original row order. Training is the first 80% of the rows. Test is the last 20%."),
draw("Four-fold cross-validation",
"Draw one round of 4-fold cross-validation, then note what happens on the next rounds.",
kfold_svg,
"K equal parts, one part for validation, and the other K-1 for training. The validation part rotates. The K accuracies are averaged."),
draw("Confusion matrix",
"Draw a 2 by 2 confusion matrix. Label the rows as actual class and the columns as predicted class. Place TP, FN, FP, and TN.",
cm_svg,
"True positive and true negative are the correct cells. False negative is an actual positive predicted negative. False positive is an actual negative predicted positive. Precision uses TP and FP. Recall uses TP and FN."),
]

def pack(prefix, kind, items):
    rng = random.Random(7215)
    out = []
    for i, item in enumerate(items, 1):
        q = dict(item)
        q["id"] = f"{prefix}{i:02d}"
        if kind:
            q["type"] = kind
        if "choices" in q:
            options = list(q["choices"])
            correct = options[q["answer"]]
            rng.shuffle(options)
            q["choices"] = options
            q["answer"] = options.index(correct)
        out.append(q)
    return out

tree_svg = """<svg viewBox="0 0 420 360" width="100%" role="img">
<g font-size="14" text-anchor="middle" fill="#1c1915">
<line x1="210" y1="36" x2="130" y2="86" stroke="#1f4d3a"/>
<line x1="210" y1="36" x2="300" y2="86" stroke="#1f4d3a"/>
<line x1="130" y1="100" x2="70" y2="156" stroke="#1f4d3a"/>
<line x1="130" y1="100" x2="190" y2="156" stroke="#1f4d3a"/>
<line x1="70" y1="170" x2="70" y2="220" stroke="#1f4d3a"/>
<line x1="190" y1="170" x2="140" y2="220" stroke="#1f4d3a"/>
<line x1="190" y1="170" x2="250" y2="220" stroke="#1f4d3a"/>
<line x1="70" y1="234" x2="70" y2="284" stroke="#1f4d3a"/>
<line x1="140" y1="234" x2="140" y2="284" stroke="#1f4d3a"/>
<circle cx="210" cy="28" r="16" fill="#fffdf8" stroke="#1f4d3a"/><text x="210" y="33">S</text>
<circle cx="130" cy="96" r="16" fill="#fffdf8" stroke="#1f4d3a"/><text x="130" y="101">A</text>
<circle cx="300" cy="96" r="16" fill="#fffdf8" stroke="#1f4d3a"/><text x="300" y="101">G</text>
<circle cx="70" cy="166" r="16" fill="#fffdf8" stroke="#1f4d3a"/><text x="70" y="171">B</text>
<circle cx="190" cy="166" r="16" fill="#fffdf8" stroke="#1f4d3a"/><text x="190" y="171">C</text>
<circle cx="70" cy="230" r="16" fill="#fffdf8" stroke="#1f4d3a"/><text x="70" y="235">D</text>
<circle cx="140" cy="230" r="16" fill="#fffdf8" stroke="#1f4d3a"/><text x="140" y="235">D</text>
<circle cx="250" cy="230" r="16" fill="#fffdf8" stroke="#1f4d3a"/><text x="250" y="235">G</text>
<circle cx="70" cy="294" r="16" fill="#fffdf8" stroke="#1f4d3a"/><text x="70" y="299">G</text>
<circle cx="140" cy="294" r="16" fill="#fffdf8" stroke="#1f4d3a"/><text x="140" y="299">G</text>
</g>
</svg>"""

def tf(topic, stem, true, explain):
    return choice(topic, stem, ["True", "False"], 0 if true else 1, explain)

midterm_choices = [
choice("2025 midterm, UNIX",
"Which programming language does the lecture say was originally developed for UNIX?",
["Python", "C", "Java", "JavaScript"],
1,
"Lecture 1 says Dennis Ritchie developed C for the UNIX operating system at Bell Labs. The 23 October 2025 midterm asks this."),
choice("2025 midterm, basic type",
"Which of the following is a basic data type in the Python lecture?",
["Array", "List", "int", "Hash"],
2,
"The lecture's basic types are int, float, and str, with booleans in Lab 1. List is a data structure. The 2025 midterm uses this contrast."),
choice("Lab 1, run a cell",
"Which command does Lab 1 use to run a Jupyter cell?",
["Shift + Enter", "Ctrl + S", "Alt + Enter only", "Enter, without a modifier"],
0,
"Shift-Enter runs the cell. Esc returns to command mode."),
choice("2025 midterm, error handling",
"Which statement is used for error handling in Python?",
["try-except", "if-else", "for", "switch-case"],
0,
"The lecture uses try and except so an exception does not crash the program. Python has no switch-case in this lecture."),
choice("2025 midterm, remainder",
"What is the value of 15 % 2?",
["1", "7", "0", "15"],
0,
"15 divided by 2 is 7 remainder 1. % is the remainder. // would give 7."),
choice("2025 midterm, mutable type",
"Which of these is mutable?",
["tuple", "str", "set", "All of them"],
2,
"The lecture table says a set is mutable. A tuple is immutable. A string is also immutable. The 2025 options include all three."),
choice("2025 midterm, power",
"What is 4 ** 2?",
["8", "16", "12", "2"],
1,
"** is exponentiation. 4 squared is 16."),
choice("2025 midterm, comment",
"How do you write a comment in Python?",
["//", "#", "/* ... */", "--"],
1,
"Lab 1 and the lecture use # for a comment."),
choice("2025 midterm, leave a loop",
"Which statement exits a loop before it finishes?",
["continue", "exit", "break", "stop"],
2,
"break ends the loop. continue only skips the rest of the current iteration."),
choice("2025 midterm, iloc",
"What does iloc do?",
["Access data by label", "Access data by integer position", "Delete missing rows", "Draw a bar chart"],
1,
"loc uses labels. iloc uses positions, counting from 0. The 2024 paper's DataFrame question uses iloc[1, 1]."),
choice("2025 midterm, range",
"What does list(range(5)) produce?",
["[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "[0, 1, 2, 3, 4, 5]", "None"],
1,
"range stops before the end value and starts at 0 when no start is given."),
choice("2025 midterm, linspace",
"What does np.linspace(0, 1, 5) produce?",
["[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "[0, 0.25, 0.5, 0.75, 1]", "[0, 0.2, 0.4, 0.6, 0.8]"],
2,
"linspace includes both endpoints and splits the interval into 5 values, so the step is 0.25."),
choice("2025 midterm, array size",
"Which NumPy name gives the number of elements?",
["length()", "count()", "size", "total()"],
2,
"An array's size attribute, or np.size(a), counts the elements. ndim counts dimensions and shape gives each dimension."),
choice("2025 midterm, show a plot",
"In Matplotlib, which function displays a plot?",
["show()", "display()", "plot()", "draw()"],
0,
"plt.plot draws the data and plt.show displays the figure. In Jupyter, %matplotlib inline can show it under the cell."),
choice("Homework 2 and the 2025 midterm, head",
"Which method returns the first few rows of a DataFrame?",
["df.head()", "df.first()", "df.top()", "df.peek()"],
0,
"Homework 2 uses df.head(6). df.tail shows the last rows."),
choice("2024 and 2025 midterms, list or tuple",
"When is a list the better choice, according to the midterm options?",
["When the collection must be modifiable after it is created.",
 "When the values must be unique.",
 "When the collection must stay a fixed size.",
 "When a function returns several values."],
0,
"A list is mutable. Unique values are a set. A tuple is the fixed, immutable collection and is also used to return several values."),
choice("2024 midterm, program errors",
"Which of these is a type of program error in Lecture 1?",
["Only a syntax error", "Only a logical error", "Only a run-time error", "Syntax, logical, and run-time errors"],
3,
"The 13 March 2024 midterm answer is all three. Divide by zero is run-time. A wrong result from bad parentheses is logical. Bad grammar is syntax."),
choice("2024 midterm, Python translation",
"The 13 March 2024 midterm asks whether Python is compiled or interpreted. Which answer does that paper's key give?",
["Python has been implemented with both compilers and interpreters.",
 "Python is neither compiled nor interpreted.",
 "Python is only compiled.",
 "Python is only interpreted."],
0,
"The lecture slide lists Python with the interpreters. The 2024 key instead says C, Pascal, and Python have each been implemented both ways. If the question is the 2024 wording, use the key's answer."),
choice("2024 midterm, notebook file",
"Which file format stores a Jupyter notebook?",
[".ipynb", ".nb", ".jnb", ".py"],
0,
"A .py file is a plain Python script. The notebook file is .ipynb."),
choice("2024 midterm, not a core collection",
"Which of these is not a core Python data type on the midterm list?",
["tuple", "class", "list", "dictionary"],
1,
"The 2024 key calls class a user-defined type. list, tuple, and dict are the collections in the lecture table."),
choice("2024 midterm, NumPy purpose",
"What does the 2024 key say NumPy is for in a notebook?",
["Creating the charts", "Manipulating tables", "Mathematical calculations", "Replacing Python syntax"],
2,
"NumPy stands for Numerical Python. The same paper assigns table manipulation to Pandas."),
choice("2024 midterm, Pandas purpose",
"What does the 2024 key say Pandas is for?",
["Creating the charts", "Manipulating and analyzing data", "Only matrix inversion", "Compiling source code"],
1,
"A DataFrame is the table. Matplotlib is the chart library."),
choice("2024 midterm, knowledge base",
"What does the knowledge base of an expert system contain?",
["Rules and facts", "Hardware components", "Only the user interface", "The test-set rows"],
0,
"The 2024 and 2025 keys both say rules and facts. The 2025 wording is factual and heuristic knowledge."),
choice("2025 midterm, why not an expert system",
"Which is NOT a reason the lecture gives for building an expert system?",
["Human expertise is in short supply.",
 "The system can preserve expert knowledge.",
 "The system can replicate human common sense.",
 "Experts can be scarce for a particular task."],
2,
"The lecture's disadvantage list says an expert system does not have human common sense. The 23 October 2025 midterm uses that point."),
choice("2025 midterm, forward chaining",
"Which description is forward chaining?",
["Start from a known conclusion and look backward.",
 "Move from the data that are already true toward a conclusion.",
 "Retrieve one row from a DataFrame.",
 "Expand the deepest node first."],
1,
"Forward chaining is data-driven. Backward chaining starts from the goal."),
choice("2025 midterm, why PyKE",
"Why does the lecture say PyKE was chosen?",
["It is written only in C.",
 "It runs in Python 3.",
 "It is a control-system library.",
 "It cannot express IF-THEN rules."],
1,
"The slide says PyKE works in Python 3, unlike PyCLIPS."),
choice("2024 and 2025 midterms, not supervised",
"Which algorithm is not supervised?",
["K-Means", "Naive Bayes", "Support Vector Machine", "Decision tree"],
0,
"K-Means is unsupervised. Naive Bayes, SVM, and decision trees are supervised on the Lecture 4 slides."),
choice("2025 midterm, logistic output",
"What kind of result does logistic regression produce on the lecture slide?",
["A continuous quantity such as salary", "A category, using the sigmoid and a 0.5 cutoff", "A time-series plot", "An image"],
1,
"Linear regression predicts a number. Logistic regression classifies. The cutoff on the slide is 0.5."),
choice("2025 midterm, F1",
"What does the F1 score measure?",
["Accuracy only", "The balance of precision and recall", "How many predictions were made", "How fast the model trains"],
1,
"F1 is 2*precision*recall/(precision+recall)."),
tf("2025 midterm, linker",
"Linkers do not handle library files. They only work with object files.",
False,
"False. The lecture says the linker joins modules and libraries and resolves references. The 2025 key says linkers can handle library files."),
tf("2024 and 2025 midterms, interpreter speed",
"An interpreter executes faster than a compiler.",
False,
"False. A compiler translates the whole source before the run. An interpreter translates line by line during the run, which the key says is slower."),
tf("2024 midterm, who translates first",
"The interpreter translates the entire source code into machine code before execution.",
False,
"False. That sentence describes a compiler. An interpreter translates during execution."),
tf("2025 midterm, set duplicates",
"A Python set can contain duplicate elements.",
False,
"False. A set keeps unique elements."),
tf("2024 and 2025 midterms, logical error",
"A logical error is found when the program runs to completion without crashing but produces the wrong output.",
True,
"True. A syntax error fails the grammar. A run-time error crashes during execution."),
tf("2025 midterm, string addition",
"Several strings can be joined in one expression with +.",
True,
"True. Lab 1 writes h + ' ' + w."),
tf("2025 midterm, nested loop",
"A loop can be nested inside another loop.",
True,
"True. The inner loop runs completely for each pass of the outer loop."),
tf("2025 midterm, BFS",
"Breadth-first search explores every node at the present depth before nodes at the next depth.",
True,
"True. That is the lecture definition. Cost optimality is still not guaranteed when step costs differ."),
tf("2025 midterm, branching factor",
"The complexity of a search algorithm is not affected by the branching factor.",
False,
"False. The 2025 key says complexity depends on the branching factor. The lecture writes that factor as b."),
tf("2025 midterm, bidirectional",
"Bidirectional search runs one search from the start and one from the goal.",
True,
"True. The goal must be known in advance, and the searches stop when they meet."),
tf("2025 midterm, heuristic optimality",
"A heuristic function guarantees that the search is optimal.",
False,
"False. The 2025 key says a heuristic is an estimate and does not by itself guarantee optimality. A* needs an h that does not overestimate."),
tf("2025 midterm, expert system definition",
"An expert system is a program that simulates the decision-making of a human expert.",
True,
"True. The lecture dates this idea to Edward Feigenbaum, around 1965, at Stanford."),
tf("2024 and 2025 midterms, quality of an expert system",
"An expert system is only as good as the data and rules it is given.",
True,
"True. An error in the knowledge base or the inference engine becomes an error in the result."),
tf("2024 midterm, inference engine",
"The main job of the inference engine is to input data and interact with the user.",
False,
"False. That job belongs to the user interface. The inference engine applies the rules. The 2024 paper spells it Interference Engine."),
tf("2025 midterm, inference engine role",
"The inference engine reasons over the knowledge base and reaches a conclusion.",
True,
"True. Forward chaining and backward chaining are the two methods on the slide."),
tf("2025 midterm, cross-validation",
"Cross-validation is used to prevent underfitting.",
False,
"False. The 2025 key says it helps prevent overfitting. K-fold rotates the validation part and averages the accuracy."),
tf("2025 midterm, supervised tasks",
"Supervised learning can be used for both classification and regression.",
True,
"True. Linear regression predicts a number. Logistic regression, trees, Naive Bayes, KNN, and SVM classify."),
tf("2024 and 2025 midterms, SVM and random forest",
"SVM and random forest are unsupervised.",
False,
"False. Both are supervised. K-Means, Apriori, and C-Means are the unsupervised names on the slide."),
tf("2024 and 2025 midterms, recommendations",
"Recommendation systems are a classic unsupervised example in the lecture.",
True,
"True. The unsupervised-learning applications slide includes recommendation systems."),
]

midterm_shorts = [
short("2022 and 2024 midterms, list and set",
"What are the differences between a list and a set? Use the points in the midterm key.",
"A list stores an arbitrary number of elements in sequential order. The elements do not have to share one type. A list is mutable.\nA set is a collection of unique elements, written with curly brackets. A set is also mutable. The lecture table adds that a list is ordered and a set is unordered.",
"This is the written answer on the 28 November 2022 quiz and the 13 March 2024 midterm. The table on those papers also shows tuple as immutable and ordered, and dict as mutable and unordered."),
short("2024 and 2025 midterms, forward chaining",
"Use forward chaining. The facts A, B, C, and E are true. D is unknown.\nRule 1: if X, B, and E are true, then Y is true.\nRule 2: if Y and D are true, then Z is true.\nRule 3: if A is true, then X is true.\nRule 4: if Y and C are true, then W is true.\nWhat goal is returned, and which rules fire?",
"The goal is W.\nA is true, so Rule 3 makes X true.\nX, B, and E are true, so Rule 1 makes Y true.\nY and C are true, so Rule 4 makes W true.\nRule 2 does not fire, because D is unknown.\nThe path is Rule 3, then Rule 1, then Rule 4.",
"The 2024 and 2025 midterms use this same rule set. Write the path, not only the final letter."),
short("2022, 2024, and 2025 midterms, the search tree",
"On the tree in the figure, write a breadth-first traversal and a depth-first traversal from S. Visit children from left to right. Two nodes may have the same letter.",
"Full traversal, which visits every node:\nBreadth-first: S, A, G, B, C, D, D, G, G, G\nDepth-first: S, A, B, D, G, C, D, G, G, G\nIf the search stops at the first goal, the key also accepts:\nBreadth-first: S, A, G\nDepth-first: S, A, B, D, G",
"The same tree is on the 2022 quiz and the 2024 and 2025 midterms. The duplicate D and G labels are different nodes."),
]

midterm_outputs = [
output("2022 and 2024 midterms, sort and a backward slice",
"Write what this code prints.",
"a = [1, 6, 3, 9, 7, 8]\na.sort(reverse=True)\nprint(a[5:2:-2])",
"Descending sort makes [9, 8, 7, 6, 3, 1]. The slice starts at index 5, stops before index 2, and steps backward by 2, so the values are 1 then 6. The 2022 and 2024 keys write [1, 6]."),
output("2024 and 2025 midterms, longer backward slice",
"Write what this code prints.",
"a = [1, 14, 3, 16, 18, 4, 19, 17, 7, 6, 11, 15, 8, 10, 2]\na.sort(reverse=True)\nprint(a[9:3:-3])",
"Count the sorted list from index 0. Start at index 9, stop before index 3, and step by -3. The 2024 and 2025 keys write [7, 11]."),
output("2022 midterm, fancy index",
"Write what this code prints. Copy NumPy's spacing.",
"import numpy as np\na = np.arange(16).reshape(4, 4)\nrow = np.array([0, 1])\ncol = np.array([2, 3])\nprint(a[row, col])",
"The pairs are (0, 2) and (1, 3). Those entries are 2 and 7. NumPy prints [2 7]. The 2022 key writes [2, 7]; the comma is not part of NumPy's print."),
output("2025 midterm, fancy index",
"Write what this code prints. Copy NumPy's spacing.",
"import numpy as np\nb = np.arange(16).reshape(4, 4)\nrow = np.array([2, 0])\ncol = np.array([3, 3])\nprint(b[row, col])",
"The pairs are (2, 3) and (0, 3). In a 4 by 4 table of 0..15 those entries are 11 and 3. The 2025 key writes [11 3]."),
output("2024 midterm, another fancy index",
"Write what this code prints. Copy NumPy's spacing.",
"import numpy as np\na = np.arange(25).reshape(5, 5)\nrow = np.array([2, 4])\ncol = np.array([0, 3])\nprint(a[row, col])",
"The pairs are (2, 0) and (4, 3). The 2024 key writes [10 23]."),
output("2022 midterm, arange plus a scalar",
"Write what this code prints. Copy NumPy's spacing.",
"import numpy as np\na = np.arange(3) + 4\nprint(a)",
"arange(3) is 0, 1, 2. Adding 4 uses broadcasting. The 2022 key writes [4 5 6]."),
output("2022 midterm, sum down the columns",
"Write what this code prints. Copy NumPy's spacing.",
"import numpy as np\na = np.array([[5, 6, 8, 6],\n              [1, 6, 4, 8],\n              [1, 8, 5, 1]])\nprint(a.sum(axis=0))",
"axis=0 adds down each column: 7, 20, 17, and 15. The 2022 key writes [7 20 17 15]."),
output("2024 midterm, ndim, shape, and size",
"Write what this code prints.",
"import numpy as np\na = np.array([[[1, 2, 3], [4, 5, 6]],\n              [[1, 2, 3], [4, 5, 6]]])\nprint(a.ndim)\nprint(a.shape)\nprint(a.size)",
"There are 3 dimensions, shape (2, 2, 3), and 12 elements. The 2024 key writes the same three values."),
output("2022, 2024, and 2025 midterms, default argument",
"Write what this code prints.",
"def my_print(person=\"Joe\"):\n    message = \"Hello, \" + person\n    print(message)\nmy_print(\"Peter\")",
"The call passes Peter, so the default Joe is not used. All three papers give Hello, Peter."),
output("2024 and 2025 midterms, DataFrame iloc",
"Write what this code prints.",
"import pandas as pd\ndf = pd.DataFrame([[1000, \"Jack\", 21], [1500, \"John\", 29]], columns=[\"1\", \"2\", \"3\"])\nprint(df.iloc[1, 1])",
"Row position 1 and column position 1 is John. The column names are the strings 1, 2, and 3, but iloc ignores those names and counts positions."),
]

midterm_shorts[2]["figure"] = tree_svg
midterm_items = (
    midterm_choices
    + [dict(q, type="short") for q in midterm_shorts]
    + [dict(q, type="output") for q in midterm_outputs]
)

sets = [
    {
        "id": "choice",
        "title": "Multiple choice",
        "when": "1 · Multiple choice",
        "blurb": "Lectures 1 to 4, Lab 1, and Homework 2. One question for each idea: programming, Python, NumPy, Matplotlib, SciPy, Pandas, search, expert systems, and machine learning.",
        "questions": pack("c", None, choices),
    },
    {
        "id": "short",
        "title": "Short answer",
        "when": "2 · Short answer",
        "blurb": "Write the comparison in English. After you submit, mark your answer against the model.",
        "questions": pack("s", "short", shorts),
    },
    {
        "id": "output",
        "title": "Written output",
        "when": "3 · Written output",
        "blurb": "Write only what is printed. Spaces do not matter. NumPy prints spaces between numbers, not commas.",
        "questions": pack("o", "output", outputs),
    },
    {
        "id": "draw",
        "title": "Drawing",
        "when": "4 · Drawing",
        "blurb": "Draw on the pad, then compare with the lecture diagram. Control-system block diagrams and neural-network sketches are not in this set.",
        "questions": pack("d", "draw", draws),
    },
    {
        "id": "midterm",
        "title": "Past midterm papers",
        "when": "5 · 2022, 2024, and 2025 midterms",
        "blurb": "The repeated questions from those three papers: choices, true or false, written output, the search tree, and forward chaining. Control-system questions are not included.",
        "questions": pack("m", None, midterm_items),
    },
]

def emit(obj, indent):
    pad = " " * indent
    if isinstance(obj, dict):
        lines = ["{"]
        items = list(obj.items())
        for i, (k, v) in enumerate(items):
            comma = "," if i < len(items) - 1 else ""
            lines.append(f"{pad}  {k}: {emit(v, indent + 2)}{comma}")
        lines.append(f"{pad}}}")
        return "\n".join(lines)
    if isinstance(obj, list):
        if not obj:
            return "[]"
        lines = ["["]
        for i, v in enumerate(obj):
            comma = "," if i < len(obj) - 1 else ""
            lines.append(f"{pad}  {emit(v, indent + 2)}{comma}")
        lines.append(f"{pad}]")
        return "\n".join(lines)
    if isinstance(obj, str):
        return json.dumps(obj, ensure_ascii=False)
    if isinstance(obj, bool):
        return "true" if obj else "false"
    if obj is None:
        return "null"
    return str(obj)

text = "const QUIZ_SETS = " + emit(sets, 0) + ";\n"
out = Path(__file__).with_name("questions.js")
out.write_text(text, encoding="utf-8")
print(f"wrote {out}")
print({s["id"]: len(s["questions"]) for s in sets})
for q in sets[2]["questions"]:
    print(q["id"], repr(q["expect"]))
