/* Exam-first eight-block outline built on the existing bilingual topic cards. */
(function () {
  const originalTopics = (window.COURSE_7224_CHAPTERS || []).flatMap((chapter) => chapter.topics || []);
  const byId = new Map(originalTopics.map((topic) => [topic.id, topic]));
  const makeTopic = (data) => ({q:[],paper:[],...data});
  const newTopics = [
    makeTopic({id:'ml-statistics',title:'机器学习与经典统计',en:'Machine Learning vs Classical Statistics',core:['机器学习强调从历史数据学习模式，并对新数据做预测或自动决策；经典统计更强调解释变量关系、检验假设与推断。','比较题应使用同一组维度：主要目标、关注点、数据规模、模型复杂度、成功标准和例子。'],coreEn:['Machine Learning learns patterns from historical data to predict or automate decisions on new data. Classical statistics focuses more on explaining relationships, testing hypotheses and making inferences.','Use the same six dimensions in a comparison: main goal, focus, data size, model complexity, success measure and example.'],diagram:['预测与自动化','六维比较','解释与推断'],diagramEn:['Prediction and automation','Six shared dimensions','Explanation and inference'],visualIcons:['🎯','▦','🔎'],case:'垃圾邮件模型以新邮件分类准确率衡量成功；统计分析可能研究某个因素是否显著影响健康结果。',caseEn:'A spam model is judged by predictive performance on new emails; a statistical study may test whether a factor has a significant effect on health.',transfer:'遇到比较题，先画两列，再逐行填写同一维度，最后各给一个例子。',transferEn:'Draw two columns, compare the same dimension row by row, then finish with one example for each approach.',type:'比较表 / 理论简答',typeEn:'comparison table / short essay',paper:['e1'],source:'Chapter 05 Review · Exercise #1',pptVisual:{src:'7224-study/review-20261023/e1-02.jpg',alt:'Machine Learning and Classical Statistics comparison answer',caption:'老师 Review 中的六维比较表。/ The six-dimension comparison used in the teacher review.'}}),
    makeTopic({id:'perceptron-signum',title:'Signum 感知机与 Mini-batch',en:'Signum Perceptron and Mini-batch Update',core:['先计算每个样本的线性组合，再用 signum 得到 -1、0 或 1；误差为真实标签减预测标签。','同一个 mini-batch 内先分别计算每个样本的更新量，再求和并一次性更新权重；不能边算样本边改权重。'],coreEn:['Compute the linear score for each sample and apply signum to obtain −1, 0 or 1. The error is the target label minus the prediction.','Within one mini-batch, compute every sample update using the same old weights, sum the updates, and change the weights once.'],diagram:['线性组合','Signum 预测','逐样本误差','Batch 求和更新'],diagramEn:['Linear score','Signum prediction','Per-sample error','Sum and update batch'],visualIcons:['Σ','±1','Δ','🔄'],case:'Exercise #4 第一轮把数据点 1 和 4 的更新量相加，得到新权重约 [0.01, 0.14, 0.26, -0.22]。',caseEn:'In Exercise #4, add the updates from data points 1 and 4; the new weights are approximately [0.01, 0.14, 0.26, −0.22].',transfer:'固定写出 Score → Prediction → Error → Δw → Batch sum → New w 六行，换数字仍照做。',transferEn:'Always write Score → Prediction → Error → Δw → Batch sum → New w, then substitute the new numbers.',type:'两轮迭代计算',typeEn:'multi-step calculation',paper:['e4'],source:'Chapter 05 Review · Exercise #4',pptVisual:{src:'7224-study/review-20261023/e4-01.jpg',alt:'Signum perceptron worked answer',caption:'老师对第一轮 mini-batch 感知机更新的计算页。/ Teacher-worked mini-batch Perceptron update.'}}),
    makeTopic({id:'perceptron-identity',title:'Identity + MSE 感知机变式',en:'Identity Activation with MSE',core:['Identity activation 直接输出线性组合，不再阈值化为类别；因此预测值和误差都是连续数。','MSE 变式仍按 mini-batch 汇总更新，但必须使用题面给出的误差和更新规则，不能照搬 signum 题。'],coreEn:['Identity activation returns the raw linear score instead of thresholding it into a class, so prediction and error remain continuous.','The MSE variation still aggregates a mini-batch update, but you must follow the stated error and update rule rather than copying the signum case.'],diagram:['Raw score','Identity output','MSE error','Batch update'],diagramEn:['Raw score','Identity output','MSE error','Batch update'],visualIcons:['Σ','↗','²','🔄'],case:'Exercise #5 第一轮更新后约为 [0.004, 0.134, 0.248, -0.238]；第二轮需继续用这组新权重计算。',caseEn:'After the first update in Exercise #5, the weights are approximately [0.004, 0.134, 0.248, −0.238]; use them in iteration two.',transfer:'先圈出 activation、loss、error 定义和 update rule，再开始代数。',transferEn:'Circle the activation, loss, error definition and update rule before doing any arithmetic.',type:'损失函数变式计算',typeEn:'loss-function variation calculation',paper:['e5'],source:'Chapter 05 Review · Exercise #5',pptVisual:{src:'7224-study/review-20261023/e5-01.jpg',alt:'Identity activation MSE worked answer',caption:'Identity activation 下预测、误差与 batch 更新的标准步骤。/ Standard prediction, error and batch-update steps.'}})
  ];
  newTopics.forEach((topic) => byId.set(topic.id, topic));

  const moduleDefs = [
    ['block1','01','机器学习基础','Machine Learning Fundamentals',1,'High priority / 高优先级',['ai-map','ml-statistics','learning-modes','train-infer','agent','data-ecosystem','cloud-edge']],
    ['block2','02','神经元与激活函数','Neurons & Activation Functions',1,'Very high / 很高优先级',['neuron','activation','normalization','nn-families']],
    ['block3','03','模型训练与损失函数','Training & Loss Functions',1,'Very high / 很高优先级',['loss-update','linear-case','feature-scaling','cross-entropy']],
    ['block4','04','感知机与权重更新计算','Perceptron Calculations',2,'Very high / 很高优先级',['perceptron-signum','perceptron-identity']],
    ['block5','05','反向传播与神经网络计算','Backpropagation & ANN',2,'Very high / 很高优先级',['fruit-score','hidden-layer','softmax','backprop','rbf']],
    ['block6','06','NLP 与 Tokenization','Language Processing',3,'High priority / 高优先级',['ngram','tokenization']],
    ['block7','07','序列模型与网络拓扑','RNN / LSTM / GRU',3,'Very high / 很高优先级',['sequence','rnn','bptt','lstm','gru']],
    ['block8','08','Attention 与 Transformer','Attention & Transformer',3,'High priority / 高优先级',['attention','transformer']]
  ];
  const outputsByBlock = {
    block1:['Short Answer','Comparison Table','Scenario'],block2:['Short Answer','Comparison Table','Calculation'],block3:['Formula','Calculation','Explanation'],block4:['Calculation','Two iterations'],block5:['Derivation','Calculation','Diagram'],block6:['MC','Short Calculation'],block7:['Comparison Table','Diagram','Explanation'],block8:['Short Answer','Diagram','Comparison']
  };
  const masteryByBlock = {
    block1:['define in English','classify a new scenario','complete a comparison'],block2:['state the formula','compare activations','calculate one neuron'],block3:['select the correct loss','show every update step','explain learning rate'],block4:['finish two iterations','keep batch weights fixed','check every sign'],block5:['draw the computation path','derive with chain rule','calculate gradients'],block6:['identify OOV/BPE/Unigram','calculate one N-gram probability','explain merge vs prune'],block7:['compare RNN and LSTM','draw and label gates','explain long dependencies'],block8:['explain Q/K/V','draw the flow','justify positional encoding']
  };
  window.COURSE_7224_CHAPTERS = moduleDefs.map(([id,no,title,en,day,priority,ids]) => ({id,no,title,en,day,priority,summary:`${priority} · ${outputsByBlock[id].join(' · ')}`,topics:ids.map((topicId) => byId.get(topicId)).filter(Boolean).map((topic) => ({...topic,priority,outputs:outputsByBlock[id],mastery:masteryByBlock[id]}))}));
  window.COURSE_7224_TOPICS = window.COURSE_7224_CHAPTERS.flatMap((module) => module.topics.map((topic) => ({...topic,chapter:module.id,chapterTitle:module.title,day:module.day})));

  const baseRender = window.render7224Study;
  window.render7224Study = function () {
    baseRender?.();
    const shell = document.querySelector('.outline-7224');
    if (!shell) return;
    const modules = window.COURSE_7224_CHAPTERS;
    const topicMap = new Map(window.COURSE_7224_TOPICS.map((topic) => [topic.id, topic]));
    document.title = 'IDAT7224 考前冲刺 · 八大复习板块';
    const sideLabel = shell.querySelector('.side-label');
    if (sideLabel) sideLabel.textContent = 'IDAT7224 · 8-BLOCK EXAM MAP / 八大复习板块';
    shell.querySelectorAll('.outline-side-chapter').forEach((details,index) => {
      const module = modules[index];
      const summary = details.querySelector('summary');
      summary?.querySelector('b')?.replaceChildren(document.createTextNode(module.en));
      summary?.querySelector('small')?.replaceChildren(document.createTextNode(module.title));
    });
    const hero = shell.querySelector('.study-hero');
    hero.querySelector('.eyebrow').textContent = 'IDAT7224 · EXAM-FIRST 8-BLOCK MAP';
    hero.querySelector('h1').innerHTML = 'Build one exam map.<br>Master eight connected blocks.<small>建立一张考试知识地图，逐个攻克八大板块</small>';
    hero.querySelector('h1 + p').innerHTML = 'The four lecture chapters and Chapter 05 Review are reorganised by exam task. <small>将四章 PPT、Chapter 05 Review 与 FAQ 按考试任务重新组织。</small>';
    hero.querySelector('.primary-link').textContent = 'Start the 3-day route / 开始三天冲刺';
    hero.querySelector('.secondary-link').href = '#block1';
    hero.querySelector('.secondary-link').textContent = 'Open Block 1 / 进入板块一';
    const picture = hero.querySelector('.big-picture');
    picture.className = 'exam-block-map';
    picture.innerHTML = modules.map((module) => `<a href="#${module.id}"><b>${module.no}</b><span>${module.en}</span><small>${module.title}</small></a>`).join('');
    const brief = shell.querySelector('.exam-brief');
    brief.innerHTML = '<div><span>5 题</span><b>Exam questions</b><small>Answer 4 / 选做 4 题</small></div><div><span>25</span><b>Marks each</b><small>每题 25 分</small></div><div><span>8</span><b>Review blocks</b><small>八大知识板块</small></div><div><span>5 级</span><b>Capability levels</b><small>记忆 → 评价</small></div><p><b>Chapter 05 is included.</b> The FAQ says not to exclude it. Prepare for definitions, comparison tables, familiar calculations, analysis and evaluation. / <b>Chapter 05 明确属于范围</b>；需同时准备定义、表格比较、课堂同型计算、分析与评价。</p>';
    const plan = shell.querySelector('#plan');
    plan.querySelector('.section-title h2').textContent = 'Three-day exam route / 三天考试路线';
    plan.querySelector('.section-title>p').textContent = 'Foundation → calculation chain → sequence and diagram output. / 先建基础，再打通计算链，最后训练序列模型与图示输出。';
    const planCopy = [
      ['DAY 1 · FOUNDATION / 建基础','Blocks 1–3 / 板块 1–3',['Build the AI/ML map and compare ML with classical statistics. / 建立机器学习地图并完成统计学比较表。','Connect neuron → activation → prediction → loss → gradient → update. / 打通神经元到更新的主链。','Output: two comparison tables, one scenario justification and basic calculations. / 输出两张比较表、一题场景判断和基础计算。'],'#block1','index.html?course=7224&day=1'],
      ['DAY 2 · CALCULATION / 攻计算','Blocks 4–5 / 板块 4–5',['Recalculate Exercises #4–#6 on blank paper. / 白纸重算感知机、MSE 与反向传播。','Write activation, loss, derivative and update rule before substituting. / 先写激活、损失、导数和更新式。','Output: two iterations plus one complete chain-rule derivation. / 输出两轮更新和一次完整链式求导。'],'#block4','index.html?course=7224&day=2'],
      ['DAY 3 · SEQUENCE / 会画会比','Blocks 6–8 + mock / 板块 6–8',['Master OOV, BPE, Unigram and one N-gram calculation. / 掌握分词选择题和一次概率计算。','Compare RNN/LSTM/GRU and draw the LSTM or attention flow. / 完成序列模型比较与结构图。','Do a 4-of-5 mock; reserve the last minutes for signs, labels and units. / 按五选四模拟并检查符号、图标与单位。'],'#block6','index.html?course=7224&day=3']
    ];
    plan.querySelectorAll('.sprint-grid article').forEach((article,index) => {
      const copy = planCopy[index];
      article.querySelector(':scope>span').textContent = copy[0];
      article.querySelector('h3').textContent = copy[1];
      article.querySelectorAll('li').forEach((li,i) => li.textContent = copy[2][i]);
      const links = article.querySelectorAll('.sprint-actions a');
      links[0].href = copy[3]; links[0].textContent = 'Start / 开始学习 →';
      links[1].href = copy[4]; links[1].textContent = 'Practice this day / 当日刷题';
    });
    shell.querySelector('.study-method').innerHTML = '<b>PASS STANDARD / 每板块过关标准</b><span>① Define in English / 英文定义</span><span>② Read or draw a diagram / 看图或画图</span><span>③ Solve one typical question / 完成典型题</span><span>④ Explain one variation / 解释变式</span>';
    shell.querySelectorAll('.outline-chapter').forEach((section,index) => {
      const module = modules[index];
      const summary = section.querySelector('.class-module>summary');
      summary.querySelector('p').textContent = `REVIEW BLOCK ${module.no}`;
      summary.querySelector(':scope>b').textContent = module.priority;
      section.querySelector('.outline-module-intro').innerHTML = `<b>${module.topics.length} KNOWLEDGE CARDS / ${module.topics.length} 个知识点</b><br>Output focus / 输出重点：<b>${module.summary}</b>. Learn in this order: concept → visual → example → exam output → variation.`;
      const doneLabel = section.querySelector('.module-done');
      doneLabel.lastChild.textContent = ` I can define, visualise and solve this block / 我能定义、看图并完成本板块题目`;
    });
    shell.querySelectorAll('.outline-topic').forEach((card) => {
      const topic = topicMap.get(card.id.replace('topic-',''));
      if (!topic) return;
      const header = card.querySelector('header');
      header.insertAdjacentHTML('beforeend', `<span class="exam-priority">${topic.priority}</span>`);
      const target = card.querySelector('.outline-topic-bottom');
      const outputs = (topic.outputs || []).map((item) => `<span>${item}</span>`).join('');
      const mastery = (topic.mastery || []).map((item) => `<li>${item}</li>`).join('');
      target.insertAdjacentHTML('beforebegin', `<section class="exam-output-panel"><div><b>EXAM OUTPUT / 考试输出</b>${outputs}</div><ul>${mastery}</ul></section>`);
    });
    const progressText = shell.querySelector('#studyProgressText');
    const progressBar = shell.querySelector('#studyProgress');
    const boxes = [...shell.querySelectorAll('[data-module]')];
    const fixProgress = () => { const completed = boxes.filter((box) => box.checked).length; progressBar.style.width = `${completed / boxes.length * 100}%`; progressText.textContent = `${completed} / ${boxes.length} blocks completed / 已完成`; };
    boxes.forEach((box) => box.addEventListener('change', fixProgress));
    fixProgress();
    shell.querySelector('.progress-panel strong').textContent = 'Progress / 八板块进度';
    shell.querySelector('.outline-materials h2').textContent = 'Annotated PPT source library / 四章 PPT 逐页批注';
    shell.querySelector('.outline-materials .section-title>p').textContent = 'Slide image on the left; page-specific Chinese translation, unique knowledge summary and linked exam output on the right. Low-information pages stay concise. / 左侧原图，右侧仅保留本页翻译、独有知识点和对应考试输出；低信息页保持精简。';
    shell.querySelectorAll('.outline-mobile-nav>a').forEach((link,index) => { link.textContent = `B${index+1} / 板块 ${index+1}`; link.href = `#block${index+1}`; });
    shell.querySelectorAll('#outlineMobileTopic optgroup').forEach((group,index) => {
      const module = modules[index];
      if (module) group.label = `B${index+1} · ${module.en} / ${module.title}`;
    });
  };

  const baseSlide = window.render7224SlideAnnotation;
  window.render7224SlideAnnotation = function (path, alt) {
    let html = baseSlide?.(path, alt) || '';
    const topicId = html.match(/href="#topic-([^"]+)"/)?.[1];
    const topic = window.COURSE_7224_TOPICS?.find((item) => item.id === topicId);
    if (!topic || !html.includes('</figcaption>')) return html;
    const outputs = (topic.outputs || []).map((item) => `<span>${item}</span>`).join('');
    const exam = `<section class="slide-exam-output"><div class="slide-card-title"><span>✓</span><b>考试输出</b><small>对应八板块</small></div><strong>${topic.en} / ${topic.title}</strong><div>${outputs}</div></section>`;
    return html.replace('</figcaption>', `${exam}</figcaption>`);
  };
})();
