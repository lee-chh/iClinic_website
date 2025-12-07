const heroConfig = {
  tag: "프리미엄 애플 케어 센터",
  title: ["병원 같은", "애플 수리 경험"],
  copy:
    "iClinic은 수리실을 의료 클린룸처럼 관리하고, Apple Genuine 부품과 병원식 프로세스로 제품을 케어합니다.",
  actions: [
    { label: "즉시 예약", href: "#booking", variant: "primary" },
    { label: "서비스 보기", href: "#services", variant: "ghost" },
  ],
};

const servicePills = [
  "맥북 메인케어",
  "아이폰 SOS",
  "데이터 프리저브",
  "워치 밸런스",
  "아이패드 리페어",
];

const servicePanels = [
  {
    tag: "맥북",
    title: "Logic Board Lab",
    copy: "재납땜, 초음파 세척, 칩 레벨 진단까지 한 번에 진행하는 병원식 케어 코스.",
    asset:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "아이폰",
    title: "Express Repair",
    copy: "액정 교체부터 방수 실링, 광학 센서 캘리브레이션까지 2시간 안에 완료.",
    asset:
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "데이터",
    title: "Secure Vault",
    copy: "암호화 보관소에서만 작업하며, 암호화 보고서를 발급해 신뢰를 보증합니다.",
    asset:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80",
  },
];

const experienceFlow = [
  {
    step: "Check-in",
    title: "클린룸 접수",
    copy: "의료용 트레이에서 제품을 인수하고, 보호필름과 살균을 즉시 진행합니다.",
  },
  {
    step: "Diagnostics",
    title: "15분 정밀 스캔",
    copy: "Apple AST2 장비와 iClinic Lab 툴로 수치화된 진단 리포트를 생성합니다.",
  },
  {
    step: "Care",
    title: "수리 & 데이터 케어",
    copy: "정품 부품 교체, 로직보드 작업, 데이터 무결성 검증을 연속 진행합니다.",
  },
  {
    step: "Hand-off",
    title: "상태 브리핑 & 예약",
    copy: "담당 케어 매니저가 결과와 다음 케어 일정을 안내합니다.",
  },
];

const hydrateHero = () => {
  document.querySelector(".hero-kicker").textContent = heroConfig.tag;
  const titleEl = document.querySelector(".hero h1");
  titleEl.innerHTML = heroConfig.title.join("<br />");
  document.querySelector(".hero-copy").textContent = heroConfig.copy;
};

const renderPills = () => {
  const tray = document.querySelector("[data-service-pills]");
  tray.innerHTML = "";
  servicePills.forEach((pill, index) => {
    const span = document.createElement("span");
    span.className = `pill${index === 0 ? " is-active" : ""}`;
    span.textContent = pill;
    tray.appendChild(span);
  });
};

const renderPanels = () => {
  const grid = document.querySelector("[data-panel-grid]");
  grid.innerHTML = "";
  const template = document.querySelector("#panel-template");
  servicePanels.forEach((panel) => {
    const node = template.content.cloneNode(true);
    node.querySelector(".panel__tag").textContent = panel.tag;
    node.querySelector("h3").textContent = panel.title;
    node.querySelector(".panel__copy").textContent = panel.copy;
    const img = node.querySelector("img");
    img.src = panel.asset;
    img.alt = `${panel.title} visual`;
    grid.appendChild(node);
  });
};

const renderExperience = () => {
  const list = document.querySelector("[data-experience]");
  const template = document.querySelector("#experience-template");
  list.innerHTML = "";
  experienceFlow.forEach((exp) => {
    const node = template.content.cloneNode(true);
    node.querySelector(".experience__step").textContent = exp.step;
    node.querySelector("h3").textContent = exp.title;
    node.querySelector("p").textContent = exp.copy;
    list.appendChild(node);
  });
};

const updateYear = () => {
  const yearNode = document.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
};

const bindScrollButtons = () => {
  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scroll);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
};

const bindDepartmentCards = () => {
  // 더알아보기 버튼 클릭 시 개별 페이지로 이동
  document.querySelectorAll(".department-card__learn-more").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // 카드 클릭 이벤트와 충돌 방지
      const department = button.dataset.departmentLink;
      // 개별 과별 페이지로 이동
      window.location.href = `./${department}.html`;
    });
  });

  // 예약 버튼 클릭 시 예약 섹션으로 스크롤
  document.querySelectorAll(".department-card__reserve").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // 카드 클릭 이벤트와 충돌 방지
      const bookingSection = document.querySelector("#booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
};

const setupVideoAutoplay = () => {
  const video = document.querySelector(".hero-video");
  if (!video) return;

  const playVideo = () => {
    video.muted = true;
    video.play().catch((err) => {
      console.log("Video autoplay failed:", err);
    });
  };

  // 처음 로드 시 재생 시도
  playVideo();

  // Intersection Observer로 화면에 보일 때 재생
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          // 화면에서 벗어나면 일시정지 (선택사항)
          // video.pause();
        }
      });
    },
    {
      threshold: 0.5, // 50% 이상 보일 때
    }
  );

  observer.observe(video);

  // 페이지 포커스 시에도 재생 확인
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && video.paused) {
      playVideo();
    }
  });

  // 로고 클릭 시 영상 재생
  const logoLink = document.querySelector(".brand");
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        playVideo();
      }, 500);
    });
  }

  // 재생 버튼 설정
  const playButton = document.querySelector(".hero-video-play-btn");
  if (playButton) {
    const updatePlayButton = () => {
      if (video.paused) {
        playButton.classList.remove("playing");
      } else {
        playButton.classList.add("playing");
      }
    };

    playButton.addEventListener("click", () => {
      if (video.paused) {
        playVideo();
      } else {
        video.pause();
      }
      updatePlayButton();
    });

    video.addEventListener("play", updatePlayButton);
    video.addEventListener("pause", updatePlayButton);
    updatePlayButton();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  hydrateHero();
  renderPills();
  renderPanels();
  renderExperience();
  updateYear();
  bindScrollButtons();
  bindDepartmentCards();
  setupVideoAutoplay();
});

