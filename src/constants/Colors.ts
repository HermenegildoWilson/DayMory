const colors = {
  light: {
    // ─── Fundos ───────────────────────────────────────────────────────────────
    // Usado como fundo de cards, modais e qualquer superfície elevada
    bgPrimary: "#FFFFFF",
    // Fundo principal do ecrã (ex: fundo da FlatList de tarefas)
    bgSecondary: "#F5F5F5",
    // Fundo de página exterior — usado atrás de cards e listas
    bgTertiary: "#EBEBEB",
    // Fundo de inputs, rows em hover e itens seleccionados
    bgElevated: "#F3F4F6",

    // ─── Tipografia ───────────────────────────────────────────────────────────
    // Títulos, nomes de tarefas e hábitos — texto principal
    textPrimary: "#111827",
    // Labels, datas, meta-informação secundária
    textSecondary: "#6B7280",
    // Placeholders em inputs e hints
    textTertiary: "#9CA3AF",
    // Texto em estado desactivado (botões, inputs bloqueados)
    textDisabled: "#D1D5DB",

    // ─── Bordas ───────────────────────────────────────────────────────────────
    // Borda padrão de cards, inputs e separadores de lista
    borderDefault: "#E5E7EB",
    // Borda de input em estado focado (ex: campo activo em Nova Tarefa)
    borderFocus: "#2563EB",
    // Borda forte para separadores de secção e dividers
    borderStrong: "#D1D5DB",

    // ─── Marca — Azul primário ────────────────────────────────────────────────
    // Cor principal: botões primários, FAB, tab activa da nav, links
    brandPrimary: "#2563EB",
    // Hover e variante secundária de botões e ícones interactivos
    brandSecondary: "#3B82F6",
    // Fundo subtil de badges, chips de categoria e card de streak
    brandSubtle: "#DBEAFE",
    // Headers, avatar de utilizador, barra de progresso deep
    brandDeep: "#1E3A8A",

    // ─── Semânticas — estados e feedback ─────────────────────────────────────
    // Hábito concluído, tarefa marcada como feita, checkboxes
    success: "#22C55E",
    // Tarefas atrasadas, avisos de prazo próximo
    warning: "#F59E0B",
    // Prioridade Alta, erros de validação em formulários
    danger: "#EF4444",
    // Insights da pseudo-IA, notificações informativas
    info: "#06B6D4",
    // Hábitos e gráficos de estatísticas no Dashboard
    purple: "#7C3AED",

    // ─── Navegação ────────────────────────────────────────────────────────────
    // Fundo da bottom tab navigation bar
    navBackground: "#FFFFFF",
    // Ícone e label da tab actualmente seleccionada
    navActive: "#2563EB",
    // Ícones e labels das tabs inactivas
    navInactive: "#D1D5DB",
  },

  dark: {
    // ─── Fundos ───────────────────────────────────────────────────────────────
    // Fundo de cards, modais e superfícies elevadas no modo escuro
    bgPrimary: "#141414",
    // Fundo principal do ecrã (ex: fundo da FlatList de tarefas)
    bgSecondary: "#1E1E1E",
    // Fundo de inputs, rows e itens em hover
    bgTertiary: "#262626",
    // Fundo de popovers, tooltips e overlays
    bgElevated: "#2A2A2A",

    // ─── Tipografia ───────────────────────────────────────────────────────────
    // Títulos, nomes de tarefas e hábitos — texto principal
    textPrimary: "#E5E7EB",
    // Labels, datas, meta-informação secundária
    textSecondary: "#9CA3AF",
    // Placeholders em inputs e hints
    textTertiary: "#6B7280",
    // Texto em estado desactivado (botões, inputs bloqueados)
    textDisabled: "#374151",

    // ─── Bordas ───────────────────────────────────────────────────────────────
    // Borda padrão de cards, inputs e separadores de lista
    borderDefault: "#2A2A2A",
    // Borda de input em estado focado (ex: campo activo em Nova Tarefa)
    borderFocus: "#3B82F6",
    // Borda forte para separadores de secção e dividers
    borderStrong: "#374151",

    // ─── Marca — Azul primário ────────────────────────────────────────────────
    // Cor principal: botões primários, FAB, tab activa da nav, links
    brandPrimary: "#3B82F6",
    // Hover e variante secundária de botões e ícones interactivos
    brandSecondary: "#60A5FA",
    // Fundo subtil de badges, chips de categoria e card de streak
    brandSubtle: "#172554",
    // Headers, avatar de utilizador, barra de progresso deep
    brandDeep: "#1E3A8A",

    // ─── Semânticas — estados e feedback ─────────────────────────────────────
    // Hábito concluído, tarefa marcada como feita, checkboxes
    success: "#22C55E",
    // Tarefas atrasadas, avisos de prazo próximo
    warning: "#F59E0B",
    // Prioridade Alta, erros de validação em formulários
    danger: "#EF4444",
    // Insights da pseudo-IA, notificações informativas
    info: "#06B6D4",
    // Hábitos e gráficos de estatísticas no Dashboard
    purple: "#A78BFA",

    // ─── Navegação ────────────────────────────────────────────────────────────
    // Fundo da bottom tab navigation bar
    navBackground: "#0F0F0F",
    // Ícone e label da tab actualmente seleccionada
    navActive: "#3B82F6",
    // Ícones e labels das tabs inactivas
    navInactive: "#333333",
  },
} as const;

export type ColorScheme = typeof colors.light & typeof colors.dark;
export type ColorKey = keyof typeof colors.light;

export default colors;
