"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    image: "/service-1.png",
    alt: "归星宠物殡葬上门接运服务",
    icon: "✦",
    title: "专车接运",
    description:
      "市内 24 小时上门接送，车辆独立安放、全程平稳转运，让最后一程也保持体面和安宁。",
  },
  {
    image: "/service-2.png",
    alt: "归星宠物殡葬告别仪式空间",
    icon: "✦",
    title: "告别仪式",
    description:
      "提供独立告别空间、鲜花布置与追思陪伴，让每一句再见都能被温柔接住。",
  },
  {
    image: "/service-3.png",
    alt: "归星宠物殡葬一宠一炉服务",
    icon: "✦",
    title: "一宠一炉",
    description:
      "火化流程独立进行，支持家属见证，信息透明清晰，把安心感落到每一个环节里。",
  },
  {
    image: "/service-4.png",
    alt: "归星宠物殡葬纪念留存服务",
    icon: "✦",
    title: "纪念留存",
    description:
      "骨灰罐、爪印、毛发瓶与纪念摆件可定制，让思念拥有能被看见的承载方式。",
  },
];

const processSteps = [
  {
    step: "STEP 01",
    title: "来电登记",
    description:
      "确认宠物体型、所在位置、希望的服务方式与接运时间，先把当下最紧要的事情理顺。",
  },
  {
    step: "STEP 02",
    title: "礼仪接运",
    description:
      "礼仪师上门接运，也可到店自行送别，过程中会有专人引导，尽量减少慌乱感。",
  },
  {
    step: "STEP 03",
    title: "净身告别",
    description:
      "进行基础整理、覆布安置与简单追思仪式，把最后的相处留得安静、郑重且有边界。",
  },
  {
    step: "STEP 04",
    title: "火化返还",
    description:
      "独立火化后返还骨灰与纪念品，也可安排树葬、海撒或集体纪念园安放方案。",
  },
];

const promises = [
  {
    title: "流程透明",
    description:
      "咨询时说明项目与费用，不临时加项；服务前后都能确认安排细节，减少信息焦虑。",
  },
  {
    title: "尊重个体",
    description:
      "不同体型、品种与家庭纪念方式，都有对应方案，尽量不把离别做成模板流程。",
  },
  {
    title: "情绪陪伴",
    description:
      "礼仪师接受基础哀伤沟通训练，在紧张和悲伤时提供更稳妥的节奏与支持。",
  },
];

const notes = [
  { value: "1200+", label: "已服务家庭" },
  { value: "1 对 1", label: "全程陪伴礼仪师" },
  { value: "365 天", label: "全年无休响应" },
];

const autoplayDelay = 4200;

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const pauseElapsedRef = useRef(0);
  const autoplayStartRef = useRef(0);
  const timeoutRef = useRef(null);
  const frameRef = useRef(null);
  const touchStartXRef = useRef(0);

  useEffect(() => {
    if (isPaused) {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return undefined;
    }

    autoplayStartRef.current = performance.now() - pauseElapsedRef.current;

    const tickProgress = () => {
      const elapsed = Math.min(
        performance.now() - autoplayStartRef.current,
        autoplayDelay,
      );
      setProgress(elapsed / autoplayDelay);

      if (elapsed < autoplayDelay) {
        frameRef.current = window.requestAnimationFrame(tickProgress);
      }
    };

    timeoutRef.current = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
      pauseElapsedRef.current = 0;
      setProgress(0);
    }, Math.max(100, autoplayDelay - pauseElapsedRef.current));

    frameRef.current = window.requestAnimationFrame(tickProgress);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [currentIndex, isPaused]);

  const goToSlide = (index) => {
    pauseElapsedRef.current = 0;
    setProgress(0);
    setCurrentIndex((index + services.length) % services.length);
  };

  const pauseAutoplay = () => {
    if (isPaused) return;
    pauseElapsedRef.current = Math.min(
      progress * autoplayDelay,
      autoplayDelay - 100,
    );
    setIsPaused(true);
  };

  const resumeAutoplay = () => {
    if (!isPaused) return;
    setIsPaused(false);
  };

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0].clientX;
    pauseAutoplay();
  };

  const handleTouchEnd = (event) => {
    const deltaX = event.changedTouches[0].clientX - touchStartXRef.current;

    if (Math.abs(deltaX) > 40) {
      goToSlide(currentIndex + (deltaX < 0 ? 1 : -1));
    }

    resumeAutoplay();
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <nav className="nav">
          <a className="brand" href="#top">
            <span className="brand-mark">归</span>
            <span>归星宠物殡葬</span>
          </a>
          <div className="nav-links">
            <a href="#services">服务项目</a>
            <a href="#process">告别流程</a>
            <a href="#location">门店位置</a>
            <a href="#contact" className="cta-link">
              预约咨询
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div>
            <span className="eyebrow fade-up">
              24 小时接运服务 · 独立告别空间 · 骨灰纪念定制
            </span>
            <h1 className="fade-up delay-1">
              用一场体面的告别
              <br />
              守护最后的温柔陪伴
            </h1>
            <p className="fade-up delay-2">
              归星宠物殡葬为猫咪、狗狗及小型伴侣动物提供遗体接运、净身整理、独立火化、纪念留存与情绪陪伴服务。
              我们相信，离别不只是结束，更是认真安放爱与思念的过程。
            </p>
            <div className="hero-actions fade-up delay-3">
              <a className="button primary" href="#contact">
                立即预约
              </a>
              <a className="button secondary" href="#location">
                查看位置
              </a>
            </div>
            <div className="hero-notes">
              {notes.map((note, index) => (
                <div
                  className={`note-card fade-up delay-${Math.min(index + 2, 4)}`}
                  key={note.label}
                >
                  <strong>{note.value}</strong>
                  <span>{note.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual fade-up delay-2">
            <div className="memorial-card">
              <div className="memorial-photo">
                <div className="paw">归星</div>
              </div>
              <div className="memorial-copy">
                <h2>留住回忆，也安放思念</h2>
                <p>
                  从接送、清洁、告别到纪念品制作，我们尽量把繁琐事务交给自己，把时间留给家人和最后的拥抱。
                </p>
              </div>
            </div>
            <div className="floating-tag">支持夜间上门接运与即时安排</div>
          </div>
        </section>

        <section id="services">
          <div className="section-heading centered">
            <div>
              <h2>服务项目</h2>
              <p>多种方案，照顾不同家庭在告别时的节奏、预算和纪念方式。</p>
            </div>
          </div>

          <div
            className="service-carousel fade-up"
            aria-label="服务内容图片轮播"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="carousel-stage">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {services.map((service, index) => (
                  <article
                    className={`carousel-slide ${index === currentIndex ? "is-active" : ""}`}
                    key={service.title}
                  >
                    <div className="carousel-slide-card">
                      <img src={service.image} alt={service.alt} />
                      <div className="carousel-overlay">
                        <h3>
                          <span>{service.icon}</span>
                          <span>{service.title}</span>
                        </h3>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="carousel-nav">
                <button
                  className="carousel-arrow prev"
                  type="button"
                  aria-label="上一张"
                  onClick={() => goToSlide(currentIndex - 1)}
                >
                  <span>‹</span>
                </button>
                <button
                  className="carousel-arrow next"
                  type="button"
                  aria-label="下一张"
                  onClick={() => goToSlide(currentIndex + 1)}
                >
                  <span>›</span>
                </button>
              </div>
            </div>

            <div className="carousel-footer">
              <div className="carousel-dots" aria-label="轮播分页按钮">
                {services.map((service, index) => (
                  <button
                    key={service.title}
                    className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
                    type="button"
                    aria-label={`查看第 ${index + 1} 张`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
              <div className="carousel-progress" aria-hidden="true">
                <div
                  className="carousel-progress-bar"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="carousel-hint">自动轮播中，鼠标悬停时暂停</div>
            </div>
          </div>
        </section>

        <section id="process">
          <div className="story-grid">
            <article className="card">
              <div className="section-heading">
                <div>
                  <h2>告别流程</h2>
                  <p>流程清晰透明，尽量减少家属在悲伤时还要反复做决定的压力。</p>
                </div>
              </div>
              <div className="timeline">
                {processSteps.map((item) => (
                  <div className="timeline-item" key={item.step}>
                    <span>{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="card quote-panel">
              <blockquote>
                “它不是一只宠物，
                <br />
                是把家填满的那位家人。”
              </blockquote>
              <p>我们用轻声、慢动作和完整记录，陪你把想说的话，好好说完。</p>
            </aside>
          </div>
        </section>

        <section>
          <div className="section-heading">
            <div>
              <h2>为什么选择我们</h2>
              <p>把标准说清楚，比空泛承诺更重要。</p>
            </div>
          </div>
          <div className="promise-grid">
            {promises.map((item, index) => (
              <article
                className={`card fade-up ${index > 0 ? `delay-${index}` : ""}`}
                key={item.title}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-panel">
            <div className="contact-copy">
              <h2>预约咨询</h2>
              <p>
                如果你正在经历离别，先不用急着处理所有事情。联系到我们后，我们会一步步陪你确认接运、仪式和纪念方式。
                深夜或节假日也可以拨打电话，我们会尽快回应。
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>24 小时服务热线</strong>
                  <span>400-888-1024</span>
                </div>
                <div className="contact-item">
                  <strong>门店地址</strong>
                  <span>上海市普陀区清涧路与新路交叉口附近（华生大厦对面）</span>
                </div>
                <div className="contact-item">
                  <strong>咨询方式</strong>
                  <span>微信：GQ-petfarewell ｜ 邮箱：hello@xingqiao-pet.com</span>
                </div>
              </div>
            </div>

            <aside className="blessing">
              <h3>写给每一位毛孩子</h3>
              <p>
                谢谢你用短短的一生，教会一个家什么是无条件的信任与依恋。以后每次想起你，愿都是温暖多一点，遗憾少一点。
              </p>
              <p>
                愿你穿过星桥，跑向更自由的原野。
                <br />
                愿爱没有结束，只是换了一种陪伴方式。
              </p>
              <a className="button secondary" href="tel:4008881024">
                电话预约
              </a>
            </aside>
          </div>
        </section>

        <section className="map-section" id="location">
          <div className="section-heading">
            <div>
              <h2>门店位置</h2>
              <p>方便访客快速确认周边地标、到店方向与接运范围。</p>
            </div>
          </div>
          <div className="map-panel fade-up">
            <div className="map-frame">
              <img src="/store-map.png" alt="归星宠物殡葬门店位置地图" />
            </div>
            <p className="map-caption">
              地址参考：上海市普陀区清涧路与新路交叉口附近（华生大厦对面）
            </p>
          </div>
        </section>
      </main>

      <footer>归星宠物殡葬 © 2026 · 宠物殡葬服务展示页</footer>
    </div>
  );
}
