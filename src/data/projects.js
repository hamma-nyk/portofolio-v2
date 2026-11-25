// Centralized project data for Projects section and ProjectDetail page.
// - `thumbnail`: Gambar yang tampil di card halaman utama (Projects).
// - `detailImages`: Daftar gambar yang tampil di slider halaman Project Detail.
//   Taruh file gambar di folder `public/assets/image/`, lalu tambahkan path-nya ke array `detailImages`.

export const infraProjects = [
  {
    slug: "topology-design-network-infrastructure",
    category: "it-support",
    title: "Topology Design and Implementation of Network Infrastructure",
    thumbnail: "/assets/image/networking.png",
    detailImages: [
      "/assets/image/networking.png",
      // "/assets/image/networking-2.png",
    ],
    desc: "PT Nusantara Building Industries",
    descModal: `- Design network topology\n- Fiber Optic installation\n- Network infrastructure management & installation`,
    fullDesc: `Designed and implemented an enterprise-grade network topology for PT Nusantara Building Industries to support reliable multi-building connectivity and operational scalability.

Key responsibilities and implementations:
- Designed structured network topology diagrams using draw.io covering core, distribution, and access layers.
- Executed Fiber Optic backbone installation and termination across factory and office zones.
- Configured and managed routing, VLAN segmentation, and wireless access points using MikroTik, Ruijie, and Ubiquiti devices.
- Conducted ongoing network infrastructure troubleshooting, bandwidth optimization, and hardware maintenance.`,
    tech: ["draw.io", "Mikrotik", "Ruijie", "Ubiquiti", "Fiber Optic"],
  },
  {
    slug: "topology-design-cctv-infrastructure",
    category: "it-support",
    title: "Topology Design and Implementation of CCTV Infrastructure",
    thumbnail: "/assets/image/cctv.png",
    detailImages: ["/assets/image/cctv.png"],
    desc: "PT Nusantara Building Industries",
    fullDesc: `Planned and deployed a comprehensive CCTV surveillance infrastructure across PT Nusantara Building Industries facilities to enhance operational security and monitoring coverage.

Key responsibilities and implementations:
- Mapped camera placement and blind-spot coverage into a structured topology using draw.io.
- Installed, configured, and integrated HIKVISION IP cameras and NVR storage systems into the local network.
- Managed remote viewing access, recording retention policies, and routine hardware maintenance.`,
    tech: ["draw.io", "HIKVISION"],
  },
  {
    slug: "truenas-esxi-infrastructure-management",
    category: "it-support",
    title: "TrueNAS and ESXi Infrastructure Management",
    thumbnail: "/assets/image/truenas.png",
    detailImages: ["/assets/image/truenas.png"],
    desc: "PT Nusantara Building Industries",
    descModal: `- TrueNAS & ESXi installation\n- User storage pool & group management\n- VM & Server management`,
    fullDesc: `Administered on-premise virtualization and centralized storage infrastructure using VMware ESXi and TrueNAS for PT Nusantara Building Industries.

Key responsibilities and implementations:
- Installed and configured TrueNAS storage servers and VMware ESXi hypervisors.
- Managed ZFS storage pools, datasets, SMB/NFS shares, and user/group access permissions.
- Provisioned, monitored, and maintained virtual machines hosting internal services, databases, and operational tools.`,
    tech: ["TrueNAS", "ESXi", "Linux"],
  },
  {
    slug: "network-vm-monitoring-dashboard",
    category: "it-support",
    title: "Network and VM Monitoring Dashboard",
    thumbnail: "/assets/image/dashboard.png",
    detailImages: ["/assets/image/dashboard.png"],
    desc: "PT Nusantara Building Industries",
    fullDesc: `Built a real-time internal monitoring dashboard to track network device availability and virtual machine health across PT Nusantara Building Industries.

Key responsibilities and implementations:
- Developed a Node.js backend collecting host and VM metrics over SSH and periodic health checks.
- Streamed live status updates to the frontend dashboard via Socket.IO for instant visibility into outages or resource spikes.
- Reduced incident detection time for IT operations by centralizing server and network telemetry in one view.`,
    tech: ["SocketIO", "NodeJS", "SSH"],
  },
];

export const webProjects = [
  {
    slug: "english-word-suggestion",
    category: "app-dev",
    title: "English Word Suggestion",
    thumbnail: "/assets/image/lletter.png",
    detailImages: ["/assets/image/lletter.png"],
    desc: "English word suggestion app using ReactJS",
    fullDesc: `A lightweight, responsive web application built with ReactJS and TailwindCSS that helps users discover English word suggestions quickly based on letter patterns and prefixes.

Key highlights:
- Clean and distraction-free interface designed for fast word lookup.
- Instant client-side filtering and responsive layout for both desktop and mobile browsers.`,
    link: "https://lletter.vercel.app/",
    tech: ["ReactJS", "TailwindCSS"],
  },
  {
    slug: "youtube-downloader",
    category: "app-dev",
    title: "Youtube Downloader",
    thumbnail: "/assets/image/ytdlp.png",
    detailImages: ["/assets/image/ytdlp.png"],
    desc: "YtDlp Web UI using ReactJS",
    fullDesc: `A modern web interface for yt-dlp built with ReactJS, TailwindCSS, and shadcn/ui, powered by a FastAPI backend for media extraction and format selection.

Key highlights:
- Supports fetching video metadata, available resolutions, and audio-only formats cleanly.
- FastAPI backend handles yt-dlp processing and streams downloads reliably.
- Styled with shadcn/ui components for a clean, modern user experience.`,
    link: "https://my-ytdlp.vercel.app/",
    tech: ["ReactJS", "TailwindCSS", "shadCN", "FastAPI"],
  },
  {
    slug: "monoblog",
    category: "app-dev",
    title: "MonoBlog",
    thumbnail: "/assets/image/monoblog.png",
    detailImages: ["/assets/image/monoblog.png"],
    desc: "Simple blog using NextJS",
    fullDesc: `A minimalist personal blogging platform built with NextJS, TailwindCSS, shadcn/ui, and Supabase for content storage and authentication.

Key highlights:
- Monochrome, typography-focused reading experience.
- Powered by Supabase for post persistence and dynamic content management.
- Built with NextJS for fast page loads and SEO-friendly routing.`,
    link: "https://cakhem-blog.vercel.app/",
    tech: ["NextJS", "TailwindCSS", "shadCN", "Supabase"],
  },
  {
    slug: "myctn",
    category: "app-dev",
    title: "MyCtn",
    thumbnail: "/assets/image/myctn.png",
    detailImages: ["/assets/image/myctn.png"],
    desc: "Simple note app using NextJS",
    fullDesc: `A streamlined note-taking web application built with NextJS, TailwindCSS, shadcn/ui, and Supabase.

Key highlights:
- Quick note creation, editing, and organization with real-time persistence via Supabase.
- Clean UI built with shadcn/ui and TailwindCSS for everyday productivity.`,
    link: "https://myctn.vercel.app/",
    tech: ["NextJS", "TailwindCSS", "shadCN", "Supabase"],
  },
  {
    slug: "qrnbi",
    category: "app-dev",
    title: "QRNBI",
    thumbnail: "/assets/image/qrnbi.png",
    detailImages: ["/assets/image/qrnbi.png"],
    desc: "QR code generator for PT Nusantara Building Industries operational use.",
    fullDesc: `An internal operational web tool created for PT Nusantara Building Industries to generate standardized QR codes quickly for asset tagging, documentation, and workflow tracking.

Key highlights:
- Built with ReactJS and TailwindCSS for instant, browser-based QR generation without external dependencies.
- Tailored for daily operational speed and ease of use by internal staff.`,
    link: "https://qrnbi.web.id/",
    tech: ["ReactJS", "TailwindCSS"],
  },
  {
    slug: "konekobot",
    category: "app-dev",
    title: "KonekoBot",
    thumbnail: "/assets/image/konekobot.png",
    detailImages: ["/assets/image/konekobot.png"],
    desc: "WhatsApp bot for automating tasks.",
    fullDesc: `An automated WhatsApp bot and web control dashboard built to streamline repetitive messaging, notifications, and task automation.

Key highlights:
- Combines NodeJS for WhatsApp session handling, Flask for backend automation services, and ReactJS for the management interface.
- Supports automated command responses and scheduled/triggered notifications.`,
    link: "https://konekobot.web.id/",
    tech: ["NodeJS", "ReactJS", "Flask"],
  },
  {
    slug: "konekocert",
    category: "app-dev",
    title: "KonekoCert",
    thumbnail: "/assets/image/konekocert.png",
    detailImages: ["/assets/image/konekocert.png"],
    desc: "Fake course certificate generator.",
    fullDesc: `A fun web application built with ReactJS and TailwindCSS that lets users customize and generate mock course certificates directly in the browser.

Key highlights:
- Interactive form inputs with live preview and instant certificate generation.
- Responsive, clean layout built with ReactJS and TailwindCSS.`,
    link: "https://konekocert.web.id/",
    tech: ["ReactJS", "TailwindCSS"],
  },
];

export const desktopProjects = [
  {
    slug: "nanostation-ap-restart-scheduler",
    category: "app-dev",
    title: "Nanostation AP Restart Scheduler",
    thumbnail: "/assets/image/aprestart.png",
    detailImages: ["/assets/image/aprestart.png"],
    desc: "Schedule Nanostation AP restart.",
    descModal: "This tools is for local use. Contact me if you want a demo.",
    fullDesc: `A Python desktop automation tool designed to schedule and execute remote restarts on Ubiquiti Nanostation Access Points via SSH.

Key highlights:
- Uses Paramiko to establish automated SSH connections to multiple Nanostation AP endpoints.
- Helps maintain wireless link stability by running scheduled maintenance reboots outside peak operational hours.
- Built for local network administration; contact me if you would like a live demo.`,
    tech: ["Python", "Paramiko"],
  },
  {
    slug: "mdb-access-to-sql-server",
    category: "app-dev",
    title: "MDB Access to SQL Server",
    thumbnail: "/assets/image/mdbconvert.png",
    detailImages: ["/assets/image/mdbconvert.png"],
    desc: "Schedule and convert data from MDB to SQL Server",
    descModal: "This tools is for local use. Contact me if you want a demo.",
    fullDesc: `A desktop data synchronization utility built with Python and Pyodbc to automatically extract records from legacy Microsoft Access (.mdb) databases and migrate them into Microsoft SQL Server.

Key highlights:
- Automates scheduled data conversion and synchronization without manual exports.
- Bridges legacy desktop database systems with centralized SQL Server infrastructure.
- Built for local operational use; contact me if you would like a demo.`,
    tech: ["Python", "Pyodbc"],
  },
  {
    slug: "local-desktop-ping-monitor-tools",
    category: "app-dev",
    title: "Local Desktop Ping Monitor Tools",
    thumbnail: "/assets/image/dping.png",
    detailImages: ["/assets/image/dping.png", "/assets/image/lping.png"],
    desc: "Desktop ping monitor tools with WhatsApp notification.",
    descModal: "This tools is for local use. Contact me if you want a demo.",
    fullDesc: `A local desktop network monitoring application built with Python and NodeJS that continuously pings critical hosts and sends instant WhatsApp alerts when downtime is detected.

Key highlights:
- Monitors multiple local IP addresses and network devices in real time.
- Integrates with a NodeJS WhatsApp gateway to deliver immediate outage and recovery notifications to IT staff.
- Built for local use; check the LinkedIn preview or contact me for a demo.`,
    tech: ["Python", "NodeJS"],
    preview:
      "https://www.linkedin.com/posts/myikos_project-desktop-network-ping-monitoring-activity-7384213008908177408-nxC2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6skr4BMfn0B9yURR30RUCZ-jPlmoMbSlQ",
  },
  {
    slug: "auto-restart-scheduler-attendance-machine",
    category: "app-dev",
    title: "Auto-Restart Scheduler for Attendance Machine",
    thumbnail: "/assets/image/rfrestart.png",
    detailImages: ["/assets/image/rfrestart.png"],
    desc: "Restarter for Attendance Machine. [ZKTeco]",
    descModal: "This tools is for local use. Contact me if you want a demo.",
    fullDesc: `A Python desktop utility built to automate scheduled restarts for ZKTeco attendance machines, preventing device freezes and ensuring reliable employee check-in synchronization.

Key highlights:
- Automates routine device reboots on a configurable schedule.
- Reduces manual IT intervention across distributed attendance terminals.
- Built for local use; check the LinkedIn preview or contact me for a demo.`,
    preview:
      "https://www.linkedin.com/posts/myikos_update-project-auto-restart-scheduler-for-activity-7381927489880846336-2-k4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6skr4BMfn0B9yURR30RUCZ-jPlmoMbSlQ",
    tech: ["Python"],
  },
  {
    slug: "desktop-telegram-broadcast-tools",
    category: "app-dev",
    title: "Desktop Telegram Broadcast Tools",
    thumbnail: "/assets/image/tgbroadcast.png",
    detailImages: ["/assets/image/tgbroadcast.png"],
    desc: "Broadcast messages to multiple Telegram groups.",
    tech: ["Python"],
    descModal: "This tools is for sale. Contact me if you are interested.",
    fullDesc: `A Python desktop application engineered to broadcast messages efficiently across multiple Telegram groups from a single interface.

Key highlights:
- Supports multi-group message broadcasting with configurable intervals.
- Built as a standalone desktop tool for streamlined community or promotional outreach.
- Available for purchase — feel free to contact me if you are interested.`,
  },
];

export const allProjects = [
  ...infraProjects,
  ...webProjects,
  ...desktopProjects,
];

export const getProjectBySlug = (slug) =>
  allProjects.find((project) => project.slug === slug);
