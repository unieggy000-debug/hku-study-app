/*
 * Exam-oriented layer for IDAT7224.
 * The original 46 classroom questions are preserved; this file adds the
 * teacher's three exam formats, Chinese explanations, and a small MCQ set.
 */
(function () {
  const topics = window.COURSE_7224_TOPICS || [];
  const topicByQuestion = new Map(topics.flatMap((topic) => topic.q.map((number) => [number, topic])));
  const typeByQuestion = new Map([
    [1,"Short answer"],[2,"Short answer"],[3,"Short answer"],[4,"Short answer"],[5,"Short answer"],[6,"Short answer"],[7,"Short answer"],
    [8,"Calculation"],[9,"Short answer"],[10,"Calculation"],[11,"Short answer"],[12,"Short answer"],[13,"Short answer"],[14,"Short answer"],
    [15,"Calculation"],[16,"Calculation"],[17,"Calculation"],[18,"Calculation"],[19,"Calculation"],[20,"Calculation"],[21,"Short answer"],[22,"Calculation"],
    [23,"Calculation"],[24,"Calculation"],[25,"Short answer"],[26,"Calculation"],[27,"Calculation"],[28,"Short answer"],[29,"Short answer"],[30,"Calculation"],
    [31,"Calculation"],[32,"Short answer"],[33,"Short answer"],[34,"Short answer"],[35,"Short answer"],[36,"Short answer"],[37,"Short answer"],[38,"Short answer"],
    [39,"Short answer"],[40,"Short answer"],[41,"Short answer"],[42,"Short answer"],[43,"Short answer"],[44,"Short answer"],[45,"Short answer"],[46,"Short answer"]
  ]);
  const chineseExplanation = (question) => {
    const topic = topicByQuestion.get(question.n);
    if (!topic) return "先定位题目考查的公式或模型，再按定义、步骤、结果和限制条件组织答案。";
    return `本题考查“${topic.title}（${topic.en}）”。${topic.core[0]} 做题时先写出定义或公式，再把题目给出的数字/场景逐项代入；如果题目改变数字或应用场景，仍沿用同一套判断步骤。`;
  };
  window.COURSE_7224_QUESTIONS = (window.COURSE_7224_QUESTIONS || []).map((question) => ({
    ...question,
    type: typeByQuestion.get(question.n) || "Short answer",
    explain: chineseExplanation(question)
  }));

  const mcq = [
    {n:47,topic:"ai-map",type:"Multiple choice",p:"Which statement best describes the relationship among AI, Machine Learning and Deep Learning?",options:["They are three unrelated technologies.","Machine Learning is a part of AI, and Deep Learning is a part of Machine Learning.","AI is a special case of Deep Learning only.","Deep Learning is a rule-based expert system."],correct:1,a:"B. Machine Learning is a part of AI, and Deep Learning is a part of Machine Learning.",explain:"层级关系是 AI ⊃ Machine Learning ⊃ Deep Learning。AI 是大领域，Machine Learning 从数据学习规律，Deep Learning 使用多层神经网络。"},
    {n:48,topic:"learning-modes",type:"Multiple choice",p:"A model learns from labelled images and their correct class names. Which learning paradigm is this?",options:["Supervised learning","Unsupervised learning","Reinforcement learning","Natural computing"],correct:0,a:"A. Supervised learning.",explain:"题目给了输入和正确标签 (x, y)，因此是 supervised learning。没有标签但要找群组才是 unsupervised learning；根据 reward 试错才是 reinforcement learning。"},
    {n:49,topic:"train-infer",type:"Multiple choice",p:"A trained model classifies a new photo on a phone. This operation is mainly:",options:["Training","Inference","Backpropagation","Data labelling"],correct:1,a:"B. Inference.",explain:"模型参数已经固定，面对新输入只产生预测，这是 inference。Training 才会用数据、loss 和更新规则学习参数。"},
    {n:50,topic:"neuron",type:"Multiple choice",p:"Which expression is the forward computation of one neuron?",options:["z = x + w − b; y = z","z = Σwᵢxᵢ + b; a = f(z)","z = y − x; a = b/f(z)","z = Σxᵢ/wᵢ; a = z − b"],correct:1,a:"B. z = Σwᵢxᵢ + b; a = f(z).",explain:"神经元先对每个输入乘以对应 weight，加总后加入 bias 得到 z，再通过 activation function 得到输出 a。"},
    {n:51,topic:"activation",type:"Multiple choice",p:"Which activation is normally used to convert mutually exclusive class scores into probabilities that sum to 1?",options:["ReLU","Tanh","Softmax","Linear identity"],correct:2,a:"C. Softmax.",explain:"Softmax 对各类别 score 取指数并除以总和，得到正数概率，所有类别概率总和为 1。"},
    {n:52,topic:"loss-update",type:"Multiple choice",p:"If the gradient is positive and the learning rate is positive, the basic update w ← w − ηg will:",options:["Increase w","Decrease w","Always set w to zero","Change only the bias"],correct:1,a:"B. Decrease w.",explain:"gradient 指向 loss 增长最快的方向，更新式减去 ηg 才沿下降方向移动；学习率越大，单次移动幅度通常越大。"},
    {n:53,topic:"nn-families",type:"Multiple choice",p:"Which pairing is the most appropriate for detecting local visual defects in an image?",options:["CNN — image defect detection","RNN — static image pixels only","GAN — ordinary regression output","N-gram — image segmentation"],correct:0,a:"A. CNN — image defect detection.",explain:"CNN 利用局部空间结构和共享卷积核，适合图像中的纹理、边缘和局部缺陷。RNN 主要利用顺序信息。"},
    {n:54,topic:"softmax",type:"Multiple choice",p:"For Softmax scores [2, 0, 0], which class has the greatest probability?",options:["The first class","The second class","The third class","All are equal"],correct:0,a:"A. The first class; the probabilities are approximately [0.787, 0.107, 0.107].",explain:"exp(2) 大于 exp(0)，所以第一类概率最大。计算时先对每个 score 取指数，再除以指数总和。"},
    {n:55,topic:"rbf",type:"Multiple choice",p:"In a Gaussian RBF unit, which input is expected to produce the stronger activation?",options:["A point far from the centre","A point close to the centre","A point with the largest raw feature value","A point with zero bias only"],correct:1,a:"B. A point close to the centre.",explain:"RBF 的核心是距离：距离中心越近，Gaussian activation 越接近 1；距离越远，激活越小。"},
    {n:56,topic:"sequence",type:"Multiple choice",p:"Why can word order matter in sequence data?",options:["Because every input must be an image","Because changing order can change meaning or temporal dependence","Because sequence data has no labels","Because all sequences have the same length"],correct:1,a:"B. Because changing order can change meaning or temporal dependence.",explain:"句子、语音和时间序列的顺序携带信息；“dog bites man”和“man bites dog”包含相同词但意义不同。"},
    {n:57,topic:"ngram",type:"Multiple choice",p:"What is the main limitation of a fixed N-gram context window?",options:["It cannot count word frequencies","It cannot directly capture dependencies outside the fixed window","It always requires image data","It has no probability interpretation"],correct:1,a:"B. It cannot directly capture dependencies outside the fixed window.",explain:"N-gram 用固定长度的历史窗口，简单但看不到更远的上下文；词表变大时还会出现稀疏和组合数量爆炸。"},
    {n:58,topic:"rnn",type:"Multiple choice",p:"Why can the same RNN parameters process sentences of different lengths?",options:["A new model is trained for every length","The same weights are reused at each time step","RNN removes all word order","The output layer stores every possible sentence"],correct:1,a:"B. The same weights are reused at each time step.",explain:"RNN 在每个时间步复用同一组参数，只是循环次数随序列长度变化，因此可以处理不同长度的句子。"},
    {n:59,topic:"bptt",type:"Multiple choice",p:"Which technique directly limits the size of an exploding gradient?",options:["Gradient clipping","Adding more tokens","Removing all activations","Replacing labels with pixels"],correct:0,a:"A. Gradient clipping.",explain:"Gradient clipping 限制梯度的最大幅度，可以控制 exploding gradient；它不能从根本上解决长期依赖带来的 vanishing gradient。"},
    {n:60,topic:"lstm",type:"Multiple choice",p:"Which LSTM gate decides how much old cell-state information to retain?",options:["Forget gate","Input gate","Output gate","Softmax gate"],correct:0,a:"A. Forget gate.",explain:"Forget gate 控制旧 cell state 保留多少；input gate 控制新信息写入多少；output gate 控制多少内部信息暴露成 hidden state。"},
    {n:61,topic:"attention",type:"Multiple choice",p:"In self-attention, what is the main role of the Value vector?",options:["It specifies the token position only","It is the information that is weighted and aggregated","It is the learning rate","It replaces the loss function"],correct:1,a:"B. It is the information that is weighted and aggregated.",explain:"Query 表示想找什么，Key 用于匹配相关性，Value 是最终按 attention weights 加权汇总的信息内容。"},
    {n:62,topic:"transformer",type:"Multiple choice",p:"Why does a Transformer need positional encoding?",options:["Self-attention alone does not provide word order","It converts labels into images","It removes the need for embeddings","It prevents every form of parallelism"],correct:0,a:"A. Self-attention alone does not provide word order.",explain:"Self-attention 可以同时看所有 token，但单独看并不知道 token 的先后位置，因此要加入 positional encoding 表示顺序。"}
  ];
  window.COURSE_7224_QUESTIONS.push(...mcq);
})();
