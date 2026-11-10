/* =========================================================
   콘텐츠 데이터 — 수치·일정·링크는 이 파일만 수정하면 됩니다.
   출처: 굿모닝아이텍(주) 가상화 기반 Solution Engineer Academy 운영계획서(2026.07)
   ========================================================= */
window.SITE = {
  links: {
    consult: "https://www.keduit.com/general/register.php?c_branch=&c_empkind=&c_idx=",
    kakao: "https://pf.kakao.com/_bCxenxd/chat"
  },

  /* 교과목 (시간: 계 / 이론 / 실기) */
  subjects: [
    { id: "s1", name: "온프레미스 인프라 구성", h: 100, t: 30, p: 70, area: "기초",
      items: ["TCP/IP 기초 및 네트워크 모델", "IP 주소 체계 (Classful / Classless)", "L3 Routing — Static, Dynamic", "Server OS 관리 (Linux, Windows Server)", "Virtualization 개념"] },
    { id: "s2", name: "온프레미스 애플리케이션 서비스", h: 100, t: 30, p: 70, area: "기초",
      items: ["DNS · Web · SMTP · POP3 · SSH · SSL · Chronyd", "MariaDB 서비스 (SQL, DB 관리)", "3-Tier 서비스 (Web + WAS + DB)", "Ansible 기반 인프라 관리·구성", "LVM · NFS · SAMBA · FTP · RAID", "LLM 기반 파이썬 애플리케이션 엔지니어링, Git/GitHub"] },
    { id: "s3", name: "클라우드 네이티브 애플리케이션 기초", h: 80, t: 24, p: 56, area: "확장",
      items: ["네트워크 고급 — VLAN, InterVLAN, STP, NAT, iptables, VPN", "오버레이 vs 언더레이 네트워크", "컨테이너 라이프사이클 관리", "Dockerfile 이미지 생성, docker-compose 배포", "Private Registry 이미지 관리"] },
    { id: "s4", name: "클라우드 인프라 관리 환경 구성", h: 50, t: 15, p: 35, area: "기초",
      items: ["Active Directory — 포리스트, 트리, 트러스트, 부모·자식 도메인", "도메인 컨트롤러와 멤버, AD DS 관리", "GPO 적용 순서, CA 서비스", "DNS 조건부 전달자를 통한 하이브리드 도메인 쿼리 라우팅"] },
    { id: "s5", name: "프라이빗 클라우드 인프라", h: 150, t: 45, p: 105, area: "핵심",
      items: ["ESXi 서버 및 VCSA 구성, VM 라이프사이클 관리", "vMotion · DRS 기반 워크로드 이동과 부하분산", "vSAN OSA/ESA 구성 비교, 스토리지 정책 (FTM · FTT)", "vSAN Stretched Cluster (Active-Active DC)", "VAAI/Reclaim 스토리지 효율화, Snapshot 구조", "Customization Specification 기반 VM 배포 표준화", "분산스위치 오버레이 네트워크, Ansible 가상화 자동화"] },
    { id: "s6", name: "클라우드 네이티브 애플리케이션 실행 환경 구성", h: 60, t: 18, p: 42, area: "확장",
      items: ["Pod · ReplicaSet · Deployment · Service", "Secret과 ConfigMap", "Ingress, nginx Ingress Controller", "블루/카나리 배포 전략, 스케줄링 관리", "모니터링 환경, multi-master 고가용성 클러스터", "Terraform 기반 IaC"] },
    { id: "s7", name: "퍼블릭 클라우드 인프라 (AWS)", h: 50, t: 15, p: 35, area: "확장",
      items: ["VPC · Route Table · Subnet · Security Group · EC2", "ALB · S3 · EFS", "Terraform 기반 인프라 자동화"] },
    { id: "s8", name: "백업 및 모니터링", h: 30, t: 9, p: 21, area: "운영",
      items: ["Veeam 기반 Backup — RPO / RTO, BC·DR 개념", "AD 백업, vSphere 백업과 Site B 복구", "Prometheus · Grafana 모니터링 구성"] }
  ],

  /* 월차별 편성 (교과 id 또는 p1/p2/etc, 시간) */
  months: [
    { label: "1월차", h: 160, focus: "네트워크·서버 기초와 서비스 구성",
      seg: [["s1", 100], ["s2", 58], ["etc", 2]] },
    { label: "2월차", h: 160, focus: "컨테이너와 Active Directory",
      seg: [["s2", 42], ["s3", 80], ["s4", 34], ["etc", 4]] },
    { label: "3월차", h: 160, focus: "1차 프로젝트 — 가상화 기반 서비스 구축",
      seg: [["s4", 16], ["s5", 20], ["p1", 120], ["etc", 4]] },
    { label: "4월차", h: 160, focus: "vSphere · vSAN 프라이빗 클라우드 집중",
      seg: [["s5", 130], ["s6", 26], ["etc", 4]] },
    { label: "5월차", h: 165, focus: "Kubernetes · AWS · 백업, 2차 프로젝트 착수",
      seg: [["s6", 34], ["s7", 50], ["s8", 30], ["p2", 42], ["visit", 5], ["etc", 4]] },
    { label: "6월차", h: 160, focus: "2차 프로젝트 — 하이브리드 인프라 운영",
      seg: [["p2", 158], ["etc", 2]] }
  ],
  segNames: { p1: "1차 프로젝트", p2: "2차 프로젝트", etc: "재량교과", visit: "선도기업 현장방문" },

  /* 진출 직무 ↔ 연계 교과 */
  roles: [
    { name: "가상화 인프라 엔지니어", rel: ["s1", "s4", "s5", "s8"],
      desc: "vSphere·vSAN 기반 가상화 플랫폼을 구축·운영하고 고객사 기술지원을 수행합니다. 굿모닝아이텍(주) 및 유관기업의 주 채용 직무입니다." },
    { name: "시스템 엔지니어", rel: ["s1", "s2", "s4", "s8"],
      desc: "Linux·Windows Server, DNS·Web·DB 서비스, AD 계정·권한을 운영하고 정기점검과 장애조치를 수행합니다." },
    { name: "클라우드 인프라 엔지니어", rel: ["s3", "s5", "s6", "s7"],
      desc: "온프레미스와 AWS를 연계한 하이브리드 환경, 컨테이너·Kubernetes 실행 환경을 구성·운영합니다." },
    { name: "기술지원·유지보수 엔지니어", rel: ["s1", "s2", "s5", "s8"],
      desc: "고객사 인프라의 정기점검, 장애 원인 분석, 업그레이드 영향도 분석과 작업을 수행합니다." },
    { name: "백업·재해복구 엔지니어", rel: ["s4", "s5", "s8"],
      desc: "백업 정책 수립, RPO/RTO 기준 설계, Site B 복구 절차 수립과 복구 테스트를 수행합니다." },
    { name: "프리세일즈 (기술영업)", rel: ["s5", "s7", "s8"],
      desc: "고객 요구사항을 분석해 구성안과 제안 기술문서를 작성하고, 데모·PoC를 지원합니다." }
  ],

  /* 프로젝트 */
  projects: [
    { tab: "1차 공통", hours: 120, title: "가상화 (VM + Container) 기반 3티어 웹서비스 구축",
      lead: "정규교과에서 배운 가상화, 리눅스 서버, 네트워크, Windows Server·AD, 컨테이너를 하나의 서비스 흐름으로 연결합니다. 기능 개발보다 인프라 구성과 연계 검증에 집중합니다.",
      tasks: ["VM과 Container로 Web · WAS · DB 3티어 배포 환경 구축", "SSL 기반 부하분산(LB), AD 연동 인증 구성", "FastAPI 기반 서비스 적용과 MSA 개념 구성", "운영 점검, 장애 대응, 기본 백업·복구 절차 수행"],
      outputs: ["시스템 구성도", "구축 결과보고서", "운영 절차서", "발표자료"],
      cases: [{ t: "손해보험사 Private Cloud 통합 서비스 포털 구축", d: "기존 vCenter 환경 위 IaaS 포털 구축. 자원 셀프서비스 신청·승인·회수, AD/SSO 연계 인증, 클러스터별 모니터링" }],
      tools: ["vSphere 실습환경", "Docker", "FastAPI", "LLM 활용 코드 작성"],
      svg: "tier3" },
    { tab: "2차 · 하이브리드", hours: 200, team: "A팀", title: "하이브리드 클라우드 (vSphere – AWS Site-to-Site VPN)",
      lead: "온프레미스 vSphere 환경과 AWS VPC를 VPN으로 연결하고, 두 환경에 서비스를 나눠 배치하는 구조를 검증합니다.",
      tasks: ["vSphere 온프레미스와 AWS 간 Site-to-Site VPN 구성", "네트워크 연동, 라우팅, 보안정책 적용", "온프레미스·클라우드 간 서비스 배치와 자원 활용 구조 검증"],
      outputs: ["하이브리드 인프라 구성도", "운영 결과보고서", "발표자료"],
      cases: [{ t: "제조·설비 기업 VMC on AWS 구축 및 전환", d: "온프레미스 vSphere와 AWS 간 Direct Connect·HCX 연결, 네트워크 세그먼트·NAT·게이트웨이 구성, 워크로드 전환" }],
      tools: ["vSphere 평가판 라이선스", "AWS Cloud", "VMware 모범사례 가이드"],
      svg: "hybrid" },
    { tab: "2차 · 고가용성", hours: 200, team: "B팀", title: "고가용성 클러스터 (vSphere / K8s HA + L/B)",
      lead: "vSphere 위에 Kubernetes HA 클러스터를 구성하고, 호스트·노드 장애를 가정해 서비스가 유지되는지 확인합니다.",
      tasks: ["vSphere 가상화 환경에 Kubernetes HA 클러스터 구성", "Load Balancer 연계 서비스 분산", "장애 상황 가정 서비스 지속성·장애조치 절차 검증"],
      outputs: ["클러스터 구성도", "점검 결과보고서", "발표자료"],
      cases: [{ t: "그룹사 SI 클라우드센터 VCF 기술지원", d: "VCF 2,084 CPU 규모 그룹 Private 클라우드 유지보수. 24×365 장애대응, EOS 대비 업그레이드 영향도 분석" }],
      tools: ["K8s 운영환경 모범사례", "vSphere HA / DRS", "현직자 멘토링"],
      svg: "ha" },
    { tab: "2차 · 자동화", hours: 200, team: "C팀", title: "자동화·모니터링 (Ansible 프로비저닝 + Grafana)",
      lead: "반복 운영작업을 Ansible로 자동화하고, 자원 상태를 Grafana 대시보드로 가시화합니다.",
      tasks: ["Ansible 기반 서버·서비스 프로비저닝 자동화", "Grafana 기반 운영자원 모니터링 대시보드 구현", "반복 운영작업 자동화와 성능·상태 점검 체계 검증"],
      outputs: ["자동화 절차서", "모니터링 결과보고서", "발표자료"],
      cases: [{ t: "보험사·반도체사 IT 자동화 환경 구축", d: "Aria Automation 기반 Blueprint/Workflow 자동화, 클러스터·호스트 단위 성능·사용량 대시보드, 이벤트·로그 수집" }],
      tools: ["Ansible", "Prometheus · Grafana", "GitHub Copilot"],
      svg: "auto" },
    { tab: "2차 · BC/DR", hours: 200, team: "D팀", title: "비즈니스 연속성 / 재해복구 (Veeam RPO·RTO, Site B 복구)",
      lead: "백업 정책을 수립하고 RPO/RTO 기준을 정한 뒤, 주 사이트 장애를 가정해 Site B에서 복구합니다.",
      tasks: ["Veeam 백업정책 수립, RPO/RTO 기준 적용", "Site B 복구 시나리오 수행", "복구 절차 문서화와 결과 검증"],
      outputs: ["백업·복구 절차서", "복구 결과보고서", "발표자료"],
      cases: [{ t: "제조·설비 기업 VMC on AWS 환경 Veeam 백업·복제·복구", d: "백업 정책·보존주기 설정, VM 복제 구성, 전체·볼륨·파일·DB 4단계 복구 절차 수립" }],
      tools: ["Veeam B&R NFR License", "vSphere", "현직자 멘토링"],
      svg: "dr" }
  ],

  /* 연간 일정: 시작월 2026-11, 열 인덱스 0 = 2026.11 */
  gantt: {
    start: { y: 2026, m: 11 }, cols: 15,
    rows: [
      { label: "1기 모집·선발", from: 1, to: 2, cls: "g1 g-light" },
      { label: "1기 교육", from: 2, to: 7, cls: "g1" },
      { label: "1기 취업지원", from: 5, to: 9, cls: "g1 g-line" },
      { label: "2기 모집·선발", from: 7, to: 8, cls: "g2 g-light" },
      { label: "2기 교육", from: 8, to: 13, cls: "g2" },
      { label: "2기 취업지원", from: 11, to: 14, cls: "g2 g-line" }
    ]
  }
};

/* 프로젝트 구성도 (SVG) */
window.DIAGRAMS = {
  tier3: `
  <svg viewBox="0 0 600 300" role="img" aria-label="3티어 웹서비스 구성도">
    <rect class="zone" x="190" y="18" width="396" height="210" rx="12"/>
    <text class="zl" x="204" y="40">vSphere Cluster</text>
    <g class="node"><rect x="14" y="110" width="78" height="44" rx="8"/><text x="53" y="137">Client</text></g>
    <g class="node hl"><rect x="106" y="104" width="72" height="56" rx="8"/><text x="142" y="128">LB</text><text class="s" x="142" y="145">SSL 종료</text></g>
    <g class="node"><rect x="214" y="62" width="96" height="44" rx="8"/><text x="262" y="89">Web VM 1</text></g>
    <g class="node"><rect x="214" y="160" width="96" height="44" rx="8"/><text x="262" y="187">Web VM 2</text></g>
    <g class="node c"><rect x="338" y="58" width="104" height="150" rx="8"/><text x="390" y="80">WAS</text>
      <rect class="pod" x="352" y="92" width="76" height="28" rx="5"/><text class="s" x="390" y="110">FastAPI ①</text>
      <rect class="pod" x="352" y="128" width="76" height="28" rx="5"/><text class="s" x="390" y="146">FastAPI ②</text>
      <rect class="pod" x="352" y="164" width="76" height="28" rx="5"/><text class="s" x="390" y="182">FastAPI ③</text></g>
    <g class="node"><rect x="470" y="110" width="98" height="44" rx="8"/><text x="519" y="137">DB VM</text></g>
    <g class="node alt"><rect x="300" y="246" width="190" height="40" rx="8"/><text x="395" y="271">AD · DNS (인증·이름해석)</text></g>
    <path class="ln fl" d="M92 132 H106"/>
    <path class="ln fl" d="M178 122 L214 84"/><path class="ln fl" d="M178 142 L214 182"/>
    <path class="ln fl" d="M310 84 L338 110"/><path class="ln fl" d="M310 182 L338 156"/>
    <path class="ln fl" d="M442 132 H470"/>
    <path class="ln dash" d="M262 204 V266 H300"/><path class="ln dash" d="M390 208 V246"/>
  </svg>`,
  hybrid: `
  <svg viewBox="0 0 600 300" role="img" aria-label="하이브리드 클라우드 구성도">
    <rect class="zone" x="14" y="30" width="230" height="230" rx="12"/><text class="zl" x="28" y="54">On-Premises · vSphere</text>
    <rect class="zone aws" x="356" y="30" width="230" height="230" rx="12"/><text class="zl" x="370" y="54">AWS · VPC 10.20.0.0/16</text>
    <g class="node"><rect x="34" y="72" width="190" height="40" rx="8"/><text x="129" y="97">vCenter · ESXi Cluster</text></g>
    <g class="node c"><rect x="34" y="124" width="88" height="40" rx="8"/><text x="78" y="149">Web VM</text></g>
    <g class="node c"><rect x="136" y="124" width="88" height="40" rx="8"/><text x="180" y="149">DB VM</text></g>
    <g class="node hl"><rect x="64" y="196" width="130" height="44" rx="8"/><text x="129" y="216">VPN Gateway</text><text class="s" x="129" y="232">172.16.0.0/16</text></g>
    <g class="node"><rect x="376" y="72" width="190" height="40" rx="8"/><text x="471" y="97">Route Table · SG</text></g>
    <g class="node c"><rect x="376" y="124" width="88" height="40" rx="8"/><text x="420" y="149">EC2</text></g>
    <g class="node c"><rect x="478" y="124" width="88" height="40" rx="8"/><text x="522" y="149">ALB · S3</text></g>
    <g class="node hl"><rect x="406" y="196" width="130" height="44" rx="8"/><text x="471" y="216">VGW</text><text class="s" x="471" y="232">Customer GW 연동</text></g>
    <path class="ln fl" d="M194 210 C270 200 330 200 406 210"/>
    <path class="ln fl rev" d="M194 226 C270 236 330 236 406 226"/>
    <text class="cap" x="300" y="188">IPsec Tunnel ×2</text>
    <text class="cap" x="300" y="268">Site-to-Site VPN</text>
  </svg>`,
  ha: `
  <svg viewBox="0 0 600 300" role="img" aria-label="고가용성 클러스터 구성도">
    <g class="node hl"><rect x="220" y="12" width="160" height="40" rx="8"/><text x="300" y="37">Load Balancer (VIP)</text></g>
    <g class="node"><rect x="40" y="82" width="150" height="40" rx="8"/><text x="115" y="107">Master 1</text></g>
    <g class="node"><rect x="225" y="82" width="150" height="40" rx="8"/><text x="300" y="107">Master 2</text></g>
    <g class="node"><rect x="410" y="82" width="150" height="40" rx="8"/><text x="485" y="107">Master 3</text></g>
    <g class="node c"><rect x="40" y="142" width="150" height="40" rx="8"/><text x="115" y="167">Worker 1 · Pods</text></g>
    <g class="node c down"><rect x="225" y="142" width="150" height="40" rx="8"/><text x="300" y="167">Worker 2 · 장애</text></g>
    <g class="node c"><rect x="410" y="142" width="150" height="40" rx="8"/><text x="485" y="167">Worker 3 · Pods</text></g>
    <rect class="zone" x="24" y="206" width="552" height="80" rx="12"/><text class="zl" x="38" y="228">vSphere HA / DRS</text>
    <g class="node alt"><rect x="40" y="236" width="150" height="38" rx="8"/><text x="115" y="260">ESXi Host 1</text></g>
    <g class="node alt down"><rect x="225" y="236" width="150" height="38" rx="8"/><text x="300" y="260">ESXi Host 2 ✕</text></g>
    <g class="node alt"><rect x="410" y="236" width="150" height="38" rx="8"/><text x="485" y="260">ESXi Host 3</text></g>
    <path class="ln fl" d="M300 52 L115 82"/><path class="ln fl" d="M300 52 V82"/><path class="ln fl" d="M300 52 L485 82"/>
    <path class="ln dash" d="M115 122 V142"/><path class="ln dash" d="M300 122 V142"/><path class="ln dash" d="M485 122 V142"/>
    <path class="ln fl warn" d="M300 196 C300 205 420 205 470 186"/>
    <text class="cap" x="420" y="222">재스케줄링</text>
  </svg>`,
  auto: `
  <svg viewBox="0 0 600 300" role="img" aria-label="자동화 모니터링 구성도">
    <g class="node hl"><rect x="18" y="116" width="120" height="64" rx="8"/><text x="78" y="142">Ansible</text><text class="s" x="78" y="160">Playbook · Inventory</text></g>
    <g class="node c"><rect x="196" y="28" width="120" height="40" rx="8"/><text x="256" y="53">web-01</text></g>
    <g class="node c"><rect x="196" y="88" width="120" height="40" rx="8"/><text x="256" y="113">web-02</text></g>
    <g class="node c"><rect x="196" y="148" width="120" height="40" rx="8"/><text x="256" y="173">was-01</text></g>
    <g class="node c"><rect x="196" y="208" width="120" height="40" rx="8"/><text x="256" y="233">db-01</text></g>
    <g class="node"><rect x="360" y="116" width="96" height="64" rx="8"/><text x="408" y="142">Prometheus</text><text class="s" x="408" y="160">exporter 수집</text></g>
    <g class="node dash-board"><rect x="478" y="70" width="108" height="156" rx="8"/><text x="532" y="92">Grafana</text>
      <rect class="gb" x="494" y="170" width="12" height="40"/><rect class="gb" x="512" y="150" width="12" height="60"/><rect class="gb" x="530" y="182" width="12" height="28"/><rect class="gb" x="548" y="130" width="12" height="80"/>
      <polyline class="gl" points="494,128 512,112 530,120 548,104 566,110"/></g>
    <path class="ln fl" d="M138 140 L196 48"/><path class="ln fl" d="M138 145 L196 108"/><path class="ln fl" d="M138 152 L196 168"/><path class="ln fl" d="M138 158 L196 228"/>
    <path class="ln dash" d="M316 48 L360 130"/><path class="ln dash" d="M316 108 L360 138"/><path class="ln dash" d="M316 168 L360 158"/><path class="ln dash" d="M316 228 L360 168"/>
    <path class="ln fl" d="M456 148 H478"/>
    <text class="cap" x="158" y="276">① 프로비저닝 자동화</text><text class="cap" x="430" y="276">② 수집 · 가시화</text>
  </svg>`,
  dr: `
  <svg viewBox="0 0 600 300" role="img" aria-label="백업 재해복구 구성도">
    <rect class="zone" x="14" y="20" width="170" height="160" rx="12"/><text class="zl" x="28" y="42">Site A (주 사이트)</text>
    <rect class="zone" x="416" y="20" width="170" height="160" rx="12"/><text class="zl" x="430" y="42">Site B (복구 사이트)</text>
    <g class="node c down"><rect x="32" y="58" width="134" height="40" rx="8"/><text x="99" y="83">vSphere VM ✕</text></g>
    <g class="node c"><rect x="32" y="114" width="134" height="40" rx="8"/><text x="99" y="139">AD · DB</text></g>
    <g class="node hl"><rect x="230" y="58" width="140" height="44" rx="8"/><text x="300" y="78">Veeam B&amp;R</text><text class="s" x="300" y="94">백업 정책 · 보존주기</text></g>
    <g class="node"><rect x="230" y="122" width="140" height="40" rx="8"/><text x="300" y="147">Backup Repository</text></g>
    <g class="node c"><rect x="434" y="58" width="134" height="40" rx="8"/><text x="501" y="83">복구 VM</text></g>
    <g class="node c"><rect x="434" y="114" width="134" height="40" rx="8"/><text x="501" y="139">서비스 재개</text></g>
    <path class="ln fl" d="M166 78 H230"/><path class="ln fl" d="M166 134 C200 134 200 90 230 86"/>
    <path class="ln dash" d="M300 102 V122"/><path class="ln fl" d="M370 142 C400 142 400 80 434 78"/>
    <line class="tl" x1="40" y1="236" x2="560" y2="236"/>
    <circle class="tp" cx="170" cy="236" r="5"/><text class="cap" x="170" y="222">마지막 백업</text>
    <circle class="tp warn" cx="300" cy="236" r="6"/><text class="cap" x="300" y="222">장애 발생</text>
    <circle class="tp ok" cx="460" cy="236" r="5"/><text class="cap" x="460" y="222">서비스 복구</text>
    <path class="span rpo" d="M170 256 H300"/><text class="cap" x="235" y="276">RPO 데이터 손실 허용</text>
    <path class="span rto" d="M300 256 H460"/><text class="cap" x="380" y="276">RTO 복구 목표 시간</text>
  </svg>`
};
