import { useState } from "react";

const dimensions = [
  { id: "rationalism", label: "理性", opposite: "直觉", color: "#C9A84C" },
  { id: "individual", label: "个体", opposite: "群体", color: "#7EB8A4" },
  { id: "freedom", label: "自由", opposite: "秩序", color: "#B07FC4" },
  { id: "change", label: "变化", opposite: "恒常", color: "#D4826A" },
  { id: "material", label: "物质", opposite: "精神", color: "#6B9ED4" },
  { id: "action", label: "行动", opposite: "沉思", color: "#A4B87E" },
];

const questions = [
  { dim: "rationalism", text: "做重要决定时，你更倾向于……", options: [{ text: "收集数据、建立逻辑框架后再决策", score: 2 }, { text: "分析主要因素，但也会参考感受", score: 1 }, { text: "先听从内心，再用逻辑验证", score: -1 }, { text: "完全相信第一感觉，逻辑只会让人迷失", score: -2 }] },
  { dim: "rationalism", text: "面对无法解释的神秘现象，你会……", options: [{ text: "寻找科学解释，一定有规律可循", score: 2 }, { text: "研究现有证据，保持怀疑", score: 1 }, { text: "接受它可能超出理性范畴", score: -1 }, { text: "相信这是某种更深层力量的显现", score: -2 }] },
  { dim: "rationalism", text: "「情感会蒙蔽判断」——你认为……", options: [{ text: "完全同意，情感是决策的干扰项", score: 2 }, { text: "部分同意，情感需要被管理", score: 1 }, { text: "部分不同意，情感也是一种信息", score: -1 }, { text: "不同意，情感本身就是最高的智慧", score: -2 }] },
  { dim: "rationalism", text: "你相信人类最伟大的能力是……", options: [{ text: "理性思考与逻辑推演", score: 2 }, { text: "系统分析与批判性思维", score: 1 }, { text: "共情与情感理解", score: -1 }, { text: "直觉与对无形事物的感知", score: -2 }] },
  { dim: "rationalism", text: "你认为真理……", options: [{ text: "可以通过逻辑和实验被客观证明", score: 2 }, { text: "大多数时候可以被理性逼近", score: 1 }, { text: "需要理性与感性共同参与才能触及", score: -1 }, { text: "只能被直接体验，无法被证明", score: -2 }] },
  { dim: "individual", text: "你认为一个人最重要的责任是……", options: [{ text: "充分实现自己的潜能与个人价值", score: 2 }, { text: "照顾好自己的同时，兼顾他人", score: 1 }, { text: "在群体利益中找到自己的位置", score: -1 }, { text: "为所属群体的福祉全力奉献", score: -2 }] },
  { dim: "individual", text: "个人幸福与集体利益冲突时……", options: [{ text: "个人幸福优先，社会是个人的集合", score: 2 }, { text: "通常能找到两全其美的方案", score: 1 }, { text: "需要适当牺牲个人，顾全大局", score: -1 }, { text: "集体利益永远高于个人", score: -2 }] },
  { dim: "individual", text: "英雄主义对你来说意味着……", options: [{ text: "一个人对抗整个系统的勇气", score: 2 }, { text: "在保持自我的同时影响他人", score: 1 }, { text: "带领群体走向更好的未来", score: -1 }, { text: "为集体完全舍弃自我", score: -2 }] },
  { dim: "individual", text: "社会进步主要来自……", options: [{ text: "少数天才和先驱者的突破", score: 2 }, { text: "个人创新在社会中的传播", score: 1 }, { text: "集体协作与制度改良", score: -1 }, { text: "群体意识的整体觉醒", score: -2 }] },
  { dim: "individual", text: "「人类天生是社会性动物」——你认为……", options: [{ text: "不同意，人类本质上是孤独个体", score: 2 }, { text: "部分同意，但独处才能发现真我", score: 1 }, { text: "同意，关系定义了我们是谁", score: -1 }, { text: "完全同意，离开群体人将失去意义", score: -2 }] },
  { dim: "freedom", text: "最理想的社会应该……", options: [{ text: "给予个人最大限度的自由，规则越少越好", score: 2 }, { text: "以自由为核心，辅以必要的底线规则", score: 1 }, { text: "在自由与秩序之间保持精心的平衡", score: -1 }, { text: "以秩序和稳定为基础，才能保障真正的自由", score: -2 }] },
  { dim: "freedom", text: "面对一条你认为不合理的规则，你会……", options: [{ text: "直接忽视，规则应服务于人而不是相反", score: 2 }, { text: "在尝试改变它的同时暂时妥协", score: 1 }, { text: "遵守但积极寻求合法途径修改", score: -1 }, { text: "遵守，规则的存在有其深意", score: -2 }] },
  { dim: "freedom", text: "「自由」最准确的定义是……", options: [{ text: "不受任何外部约束的行动能力", score: 2 }, { text: "在不伤害他人的边界内随心所欲", score: 1 }, { text: "在社会框架内追求自我实现", score: -1 }, { text: "服从真正适合自己本性的秩序", score: -2 }] },
  { dim: "freedom", text: "对于传统和惯例，你的态度是……", options: [{ text: "大胆打破，创新才能进步", score: 2 }, { text: "质疑后保留有价值的部分", score: 1 }, { text: "尊重但不盲从", score: -1 }, { text: "珍视，传统承载着集体智慧", score: -2 }] },
  { dim: "freedom", text: "混乱与秩序，你认为……", options: [{ text: "混乱是创造力的温床", score: 2 }, { text: "适度混乱能激发活力", score: 1 }, { text: "秩序是进步的必要前提", score: -1 }, { text: "秩序是文明的根基，混乱是堕落", score: -2 }] },
  { dim: "change", text: "「人不能两次踏入同一条河流」——你认为……", options: [{ text: "完全正确，万物皆流，没有永恒", score: 2 }, { text: "基本正确，变化是宇宙的本质", score: 1 }, { text: "部分正确，变化中有不变的核心", score: -1 }, { text: "有些东西是永恒不变的", score: -2 }] },
  { dim: "change", text: "对人生中的重大改变，你持……", options: [{ text: "兴奋期待，变化带来成长机会", score: 2 }, { text: "开放接受，虽然有时让人不安", score: 1 }, { text: "谨慎对待，稳定中的改变才可靠", score: -1 }, { text: "能不变就不变，稳定是幸福的基础", score: -2 }] },
  { dim: "change", text: "关于人的本性，你认为……", options: [{ text: "人可以通过努力彻底改变自己", score: 2 }, { text: "人能改变很多，但需要时间", score: 1 }, { text: "人的核心特质较难改变", score: -1 }, { text: "人的本性基本固定，自知比改变更重要", score: -2 }] },
  { dim: "change", text: "你更欣赏哪种生活哲学？", options: [{ text: "活在当下，拥抱每一刻的新鲜", score: 2 }, { text: "在流动中寻找意义", score: 1 }, { text: "建立可持续的生活方式", score: -1 }, { text: "找到不变的价值并忠于它", score: -2 }] },
  { dim: "change", text: "面对失去，你倾向于认为……", options: [{ text: "放手是成长的必修课，一切皆无常", score: 2 }, { text: "接受失去，但珍视曾有的美好", score: 1 }, { text: "通过纪念让失去的东西延续", score: -1 }, { text: "有些东西不应消逝，值得全力守护", score: -2 }] },
  { dim: "material", text: "你认为意识是……", options: [{ text: "大脑神经活动的产物，可被科学完全解释", score: 2 }, { text: "主要是物质过程，但仍有未解之谜", score: 1 }, { text: "不能被简单还原为物质", score: -1 }, { text: "某种超越物质的独立存在", score: -2 }] },
  { dim: "material", text: "关于幸福，你认为……", options: [{ text: "幸福最终来自满足基本物质需求", score: 2 }, { text: "物质是基础，但精神追求同样重要", score: 1 }, { text: "精神层面的满足比物质更持久", score: -1 }, { text: "真正的幸福只存在于精神或灵性的层面", score: -2 }] },
  { dim: "material", text: "科学无法解释某种体验时，你倾向于认为……", options: [{ text: "我们还没找到正确的科学工具", score: 2 }, { text: "也许有些事物暂时超出科学边界", score: 1 }, { text: "现实可能比物质世界更复杂", score: -1 }, { text: "有些真相只能通过内在体验获得", score: -2 }] },
  { dim: "material", text: "你更认同哪种观点？", options: [{ text: "物质世界是一切的基础，意义由人类创造", score: 2 }, { text: "物质与意义并存，相互影响", score: 1 }, { text: "意义不仅仅是人类的创造", score: -1 }, { text: "精神或意义先于物质而存在", score: -2 }] },
  { dim: "material", text: "对于艺术和美，你认为……", options: [{ text: "审美体验本质上是神经与进化的产物", score: 2 }, { text: "美是客观的，可以被分析量化", score: 1 }, { text: "美超越纯粹的物质解释", score: -1 }, { text: "美是通向更高实在的窗口", score: -2 }] },
  { dim: "action", text: "面对复杂问题，你的本能是……", options: [{ text: "立刻行动，在实践中找答案", score: 2 }, { text: "快速评估后行动，不过度思考", score: 1 }, { text: "充分思考后再谨慎行动", score: -1 }, { text: "深度沉思直到获得清晰洞见", score: -2 }] },
  { dim: "action", text: "改变世界最有力的方式是……", options: [{ text: "持续的实际行动和具体改变", score: 2 }, { text: "行动与倡导相结合", score: 1 }, { text: "改变观念，观念最终驱动行动", score: -1 }, { text: "深化智慧，智慧是一切行动的根源", score: -2 }] },
  { dim: "action", text: "你更欣赏哪种人？", options: [{ text: "雷厉风行、言出必行的行动者", score: 2 }, { text: "既能思考又能执行的实干家", score: 1 }, { text: "深思熟虑、洞察深远的智者", score: -1 }, { text: "通过内在修炼影响外在世界的人", score: -2 }] },
  { dim: "action", text: "人生的意义更多来自……", options: [{ text: "你做了什么，留下了什么", score: 2 }, { text: "在行动中体验和成长", score: 1 }, { text: "你理解了什么，洞见了什么", score: -1 }, { text: "你是谁，而不是你做了什么", score: -2 }] },
  { dim: "action", text: "对于「知行合一」，你的理解是……", options: [{ text: "重点在实践，知识只有转化为行动才有价值", score: 2 }, { text: "先行动，在实践中深化认知", score: 1 }, { text: "先深化认知，行动自然水到渠成", score: -1 }, { text: "重点在认知，真正的认知本身就是一种行动", score: -2 }] },
];

const descriptions = {
  rationalism: {
    pos: { label: "理性主义者", text: "你相信逻辑与证据是认识世界的最可靠路径。你倾向于用分析框架处理问题，对直觉保持审慎的怀疑。笛卡尔、康德或许是你的精神同道。" },
    neg: { label: "直觉主义者", text: "你相信内在感知与直觉承载着比逻辑更深的智慧。你善于在数据之间的空隙中感知意义，荣格或道家哲学的气质或许与你相近。" },
  },
  individual: {
    pos: { label: "个人主义者", text: "你将个体视为最高的价值单元。自我实现、个人责任与独立精神是你的核心信念。你的哲学谱系可能连接着尼采、萨特或洛克。" },
    neg: { label: "集体主义者", text: "你认为人在关系与共同体中才能找到真正的意义。集体的福祉与个人的繁荣是不可分割的。孔子、涂尔干或罗尔斯或许是你的同路人。" },
  },
  freedom: {
    pos: { label: "自由意志者", text: "你将自由置于秩序之上。打破框架、质疑规则、拥抱不确定——这些对你来说不是叛逆，而是对人类本质的忠诚。卢梭、穆勒或无政府主义传统或许能引起你的共鸣。" },
    neg: { label: "秩序守护者", text: "你相信稳定的结构是人类繁荣的土壤。秩序不是压迫，而是自由的前提。你的哲学气质或许接近亚里士多德、霍布斯或保守主义传统。" },
  },
  change: {
    pos: { label: "流变论者", text: "你与赫拉克利特站在同一河边——万物流转，没有永恒。拥抱无常、在变化中寻找活力，是你对存在的回应方式。" },
    neg: { label: "恒常论者", text: "你相信在流变之中存在不变的本质。你更像巴门尼德或柏拉图——在现象的涌动之下，寻找那个静止的、永恒的真实。" },
  },
  material: {
    pos: { label: "物质主义者", text: "你认为物质世界是一切存在的基础。意识、意义、价值——都从物质中生长。你的哲学立场靠近唯物论、自然主义或实证主义。" },
    neg: { label: "理念主义者", text: "你相信精神、意义或意识在某种程度上先于或超越物质。世界不只是粒子的运动，还有某种更深的维度在等待被触及。柏拉图、黑格尔或东方智慧传统或许与你接近。" },
  },
  action: {
    pos: { label: "实践主义者", text: "你相信真正的知识在行动中产生，改变世界胜于理解世界。哲学家们以不同方式解释世界，而问题在于改变世界——这句话或许说出了你的心声。" },
    neg: { label: "沉思者", text: "你认为深度的理解与内在的洞见是一切行动的真正根源。亚里士多德将沉思（theoria）视为最高的人类活动，你可能与他心意相通。" },
  },
};

export default function PhilosophyTest() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("intro");
  const [revealed, setRevealed] = useState(false);

  const q = questions[current];
  const progress = (current / questions.length) * 100;
  const dimInfo = dimensions.find(d => d.id === q?.dim);

  const handleSelect = (score, idx) => {
    setSelected(idx);
    setTimeout(() => {
      const newAnswers = { ...answers, [current]: score };
      setAnswers(newAnswers);
      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setPhase("result");
        setTimeout(() => setRevealed(true), 300);
      }
    }, 350);
  };

  const getScore = (dimId) => {
    let total = 0;
    questions.forEach((qq, i) => {
      if (qq.dim === dimId && answers[i] !== undefined) total += answers[i];
    });
    return total;
  };

  const getPercent = (dimId) => {
    const score = getScore(dimId);
    return Math.round(((score + 10) / 20) * 100);
  };

  const getPortrait = () => {
    const r = getScore("rationalism") >= 0;
    const ind = getScore("individual") >= 0;
    const f = getScore("freedom") >= 0;
    const ch = getScore("change") >= 0;
    const m = getScore("material") >= 0;
    const a = getScore("action") >= 0;
    const posCount = [r, ind, f, ch, m, a].filter(Boolean).length;

    if (r && ind && f && ch && m && a) return { name: "启蒙行动者", ref: "伏尔泰 · 穆勒", text: "你是启蒙精神的典型继承者——理性、自由、个人权利与对变化的开放。你相信人可以通过理性和行动改造世界，不依赖神秘力量，也不屈服于传统权威。" };
    if (r && ind && f && ch && m && !a) return { name: "理性流浪者", ref: "休谟 · 罗素", text: "你用逻辑解剖世界，用怀疑清扫迷雾，然后坐下来慢慢思考。你相信只有想清楚了，行动才有意义。你是个人主义者，也是不折不扣的现实主义者。" };
    if (!r && ind && f && ch && !m && !a) return { name: "浪漫主义灵魂", ref: "尼采 · 柏格森", text: "直觉、自由、个体、变化、精神——你身上流淌着浪漫主义的血液。你拒绝被理性框住，相信生命的涌动比任何逻辑都更真实。你是个人英雄，也是永恒的寻路者。" };
    if (r && ind && f && ch && !m && !a) return { name: "存在主义者", ref: "萨特 · 加缪", text: "理性与自由是你的双翼，但你拒绝把世界还原为纯粹的物质机器。你相信意义需要被创造，而不是被发现。你在沉思中质问，在质问中前行。" };
    if (!r && !ind && !f && !ch && !m && !a) return { name: "东方传统守望者", ref: "老子 · 孔子", text: "你相信直觉与集体智慧，珍视秩序与恒常，在精神层面寻找归宿，并在沉思中获得力量。你身上有一种古老的、沉稳的气质——万物自有其道，不必急于打破。" };
    if (r && !ind && !f && !ch && !m && !a) return { name: "东方理性内省者", ref: "王阳明 · 朱熹", text: "你以理性为工具，却指向集体与精神；你尊重秩序与恒常，在沉思中获得智慧。你是那种少见的人——用西方的逻辑，走东方的路。" };
    if (!r && ind && f && !ch && !m && a) return { name: "灵性行动者", ref: "甘地 · 托尔斯泰", text: "你以直觉和精神力量为基础，为个体自由而行动。你不依赖数据，依赖良知；不构建体系，而是突破体系。你相信精神的力量可以推动现实的改变。" };
    if (r && !ind && !f && !ch && m && !a) return { name: "社群理性主义者", ref: "涂尔干 · 罗尔斯", text: "你用理性思考，但目的不是成就自我，而是理解集体如何更好地运转。你相信稳定的物质基础和社会秩序，在沉思中寻找对群体有益的答案。" };
    if (posCount >= 5) return { name: "现代启蒙者", ref: "密尔 · 杜威", text: "你的思想重心在理性、自由与现实这一侧。你相信个体的力量，拥抱变化，是典型的现代西方哲学气质体现者。" };
    if (posCount <= 1) return { name: "深沉内省者", ref: "庄子 · 维特根斯坦", text: "你的重心落在直觉、集体、秩序与精神这一侧。你有一种深沉的内省气质，不轻易被潮流裹挟，在沉静中保持对世界的独特感知。" };
    return { name: "独特的中间行者", ref: "蒙田 · 加缪", text: "你在理性与直觉、个人与集体、行动与沉思之间保持着微妙的张力。你不属于任何单一哲学阵营——这种复杂性本身，就是你最大的财富。" };
  };

  const reset = () => {
    setCurrent(0);
    setAnswers({});
    setSelected(null);
    setPhase("intro");
    setRevealed(false);
  };

  const base = {
    minHeight: "100vh",
    background: "#0D0D0F",
    color: "#E8E2D4",
    fontFamily: "Georgia, serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
  };

  const wrap = { width: "100%", maxWidth: "640px" };

  if (phase === "intro") return (
    <div style={base}>
      <div style={wrap}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#5A5040", marginBottom: "28px", textTransform: "uppercase" }}>Philosophical Profile</div>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 44px)", fontWeight: "400", color: "#E8E2D4", lineHeight: 1.25, marginBottom: "14px" }}>
            你是谁<br />
            <em style={{ color: "#C9A84C" }}>在思想的深处</em>
          </h1>
          <p style={{ fontSize: "14px", color: "#6A6050", lineHeight: 1.9, maxWidth: "380px", margin: "0 auto 44px", fontStyle: "italic" }}>
            30道问题，6条坐标轴<br />绘制你独一无二的哲学地图
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "44px" }}>
            {dimensions.map(d => (
              <span key={d.id} style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "3px", padding: "6px 12px", fontSize: "11px", color: "#6A6050" }}>
                <span style={{ color: d.color, marginRight: "5px" }}>●</span>
                {d.label} · {d.opposite}
              </span>
            ))}
          </div>
          <button
            onClick={() => setPhase("test")}
            style={{ background: "transparent", border: "1px solid #C9A84C", color: "#C9A84C", padding: "13px 44px", fontSize: "12px", letterSpacing: "3px", cursor: "pointer", textTransform: "uppercase", fontFamily: "inherit", borderRadius: "2px" }}
            onMouseEnter={e => { e.target.style.background = "#C9A84C"; e.target.style.color = "#0D0D0F"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#C9A84C"; }}
          >
            开始探索
          </button>
          <p style={{ marginTop: "18px", fontSize: "11px", color: "#2A2820", letterSpacing: "1px" }}>约 8 分钟 · 无正确答案</p>
        </div>
      </div>
    </div>
  );

  if (phase === "test") return (
    <div style={base}>
      <div style={wrap}>
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "10px", color: "#4A4030", letterSpacing: "2px", textTransform: "uppercase" }}>
              <span style={{ color: dimInfo?.color, marginRight: "6px" }}>●</span>
              {dimInfo?.label} · {dimInfo?.opposite}
            </span>
            <span style={{ fontSize: "10px", color: "#3A3020", letterSpacing: "1px" }}>{current + 1} / {questions.length}</span>
          </div>
          <div style={{ height: "1px", background: "#181818" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: dimInfo?.color, transition: "width 0.4s ease", opacity: 0.6 }} />
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "9px", color: "#2A2820", letterSpacing: "3px", marginBottom: "12px", textTransform: "uppercase" }}>Question {current + 1}</div>
          <h2 style={{ fontSize: "clamp(16px, 2.6vw, 23px)", fontWeight: "400", lineHeight: 1.65, color: "#D8D2C4", margin: 0, fontStyle: "italic" }}>
            {q.text}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          {q.options.map((opt, i) => {
            const isSel = selected === i;
            return (
              <button
                key={i}
                onClick={() => selected === null && handleSelect(opt.score, i)}
                style={{
                  background: isSel ? "rgba(201,168,76,0.09)" : "rgba(255,255,255,0.01)",
                  border: `1px solid ${isSel ? "#C9A84C" : "rgba(255,255,255,0.05)"}`,
                  borderRadius: "4px",
                  padding: "14px 18px",
                  textAlign: "left",
                  cursor: selected === null ? "pointer" : "default",
                  color: isSel ? "#C9A84C" : "#7A7060",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  fontFamily: "inherit",
                  transition: "all 0.12s",
                  display: "flex",
                  gap: "12px",
                }}
                onMouseEnter={e => { if (selected === null) { e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; e.currentTarget.style.color = "#B8A870"; } }}
                onMouseLeave={e => { if (!isSel) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#7A7060"; } }}
              >
                <span style={{ color: "#2A2820", fontSize: "10px", flexShrink: 0, marginTop: "4px" }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const portrait = getPortrait();

  return (
    <div style={{ ...base, justifyContent: "flex-start", paddingTop: "44px", paddingBottom: "44px" }}>
      <div style={wrap}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "9px", letterSpacing: "5px", color: "#5A5040", marginBottom: "12px", textTransform: "uppercase" }}>Your Philosophical Profile</div>
          <h1 style={{ fontSize: "clamp(18px, 3vw, 30px)", fontWeight: "400", color: "#E8E2D4", margin: 0, fontStyle: "italic" }}>你的思想坐标</h1>
        </div>

        <div style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease 0ms", marginBottom: "40px", border: "1px solid rgba(201,168,76,0.22)", borderRadius: "6px", padding: "24px 24px 20px", background: "rgba(201,168,76,0.04)" }}>
          <div style={{ fontSize: "9px", letterSpacing: "4px", color: "#6A5A30", marginBottom: "12px", textTransform: "uppercase" }}>综合画像</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: "400", color: "#C9A84C", margin: 0, fontStyle: "italic" }}>{portrait.name}</h2>
            <span style={{ fontSize: "11px", color: "#5A4A20", letterSpacing: "1px" }}>{portrait.ref}</span>
          </div>
          <p style={{ fontSize: "13px", color: "#8A7850", lineHeight: 1.85, margin: 0 }}>{portrait.text}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "44px" }}>
          {dimensions.map((dim, idx) => {
            const pct = getPercent(dim.id);
            const score = getScore(dim.id);
            const desc = score >= 0 ? descriptions[dim.id].pos : descriptions[dim.id].neg;
            const delay = idx * 90;
            return (
              <div key={dim.id} style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(10px)", transition: `all 0.45s ease ${delay + 200}ms` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "7px" }}>
                  <div>
                    <span style={{ color: dim.color, fontSize: "9px", marginRight: "6px" }}>●</span>
                    <span style={{ fontSize: "13px", color: "#C8C2B4" }}>{dim.label}</span>
                    <span style={{ fontSize: "11px", color: "#2A2820", margin: "0 6px" }}>·</span>
                    <span style={{ fontSize: "13px", color: "#2A2820" }}>{dim.opposite}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: dim.color, fontStyle: "italic" }}>{desc.label}</span>
                </div>
                <div style={{ height: "2px", background: "#141414", borderRadius: "1px", marginBottom: "10px", position: "relative" }}>
                  <div style={{ position: "absolute", left: "50%", top: "-3px", width: "1px", height: "8px", background: "#202020" }} />
                  <div style={{ height: "100%", width: `${pct}%`, background: dim.color, borderRadius: "1px", transition: `width 0.85s ease ${delay + 350}ms`, opacity: 0.75 }} />
                </div>
                <p style={{ fontSize: "12px", color: "#4A4030", lineHeight: 1.8, margin: 0, paddingLeft: "12px", borderLeft: `1px solid ${dim.color}25`, fontStyle: "italic" }}>
                  {desc.text}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <button
            onClick={reset}
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.06)", color: "#4A4030", padding: "10px 28px", fontSize: "10px", letterSpacing: "2px", cursor: "pointer", textTransform: "uppercase", fontFamily: "inherit", borderRadius: "2px" }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.color = "#7A7060"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.color = "#4A4030"; }}
          >
            重新测试
          </button>
        </div>
      </div>
    </div>
  );
}
