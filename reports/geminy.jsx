import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  LayoutDashboard, 
  ListTodo, 
  Settings, 
  Wifi, 
  WifiOff, 
  AlertCircle, 
  ChevronLeft,
  Calendar,
  BarChart3,
  User,
  LogOut,
  RefreshCw,
  Clock
} from 'lucide-react';

// --- Constantes de Estilo ---
const COLORS = {
  primary: '#2D6A4F', // Verde escuro
  secondary: '#FF8C00', // Laranja
  bg: '#F8F9FA',
  text: '#333333',
  white: '#FFFFFF',
  danger: '#DC3545',
  success: '#28A745'
};

const App = () => {
  // --- Estados do App ---
  const [view, setView] = useState('login'); // login, list, create, dashboard, success
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Estudar React Native', description: 'Rever hooks e navegação', date: '2024-04-20', completed: false, syncPending: false },
    { id: 2, title: 'Academia', description: 'Treino de pernas', date: '2024-04-20', completed: true, syncPending: false },
    { id: 3, title: 'Comprar Mercado', description: 'Leite, ovos, pão', date: '2024-04-21', completed: false, syncPending: false },
  ]);
  const [lastCompletedTask, setLastCompletedTask] = useState(null);
  const [user, setUser] = useState(null);

  // --- Lógica de Inteligência (Epic 8) ---
  const insights = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const delayed = tasks.filter(t => !t.completed && t.date < today).length;
    const completedToday = tasks.filter(t => t.completed && t.date === today).length;
    return { delayed, completedToday };
  }, [tasks]);

  // --- Handlers ---
  const handleLogin = () => {
    setUser({ name: 'Usuário Teste', email: 'seuemail@exemplo.com' });
    setView('list');
  };

  const addTask = (newTask) => {
    const task = { 
      ...newTask, 
      id: Date.now(), 
      completed: false, 
      syncPending: !isOnline 
    };
    setTasks([task, ...tasks]);
    setView('list');
    if (isOnline) triggerSync();
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const newState = !t.completed;
        if (newState) {
          setLastCompletedTask(t.title);
          setTimeout(() => setView('success'), 300);
        }
        return { ...t, completed: newState, syncPending: !isOnline };
      }
      return t;
    }));
    if (isOnline) triggerSync();
  };

  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  // --- Componentes de Tela ---

  const LoginScreen = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-white">
      <div className="mb-12 flex flex-col items-center">
        <div className="w-20 h-20 bg-white border-2 border-green-700 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
          <CheckCircle2 size={48} color={COLORS.primary} />
        </div>
        <h1 className="text-3xl font-bold text-slate-700">DayMory</h1>
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Email</label>
          <input 
            type="email" 
            placeholder="seuemail@exemplo.com"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Senha</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <button 
          onClick={handleLogin}
          className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95"
        >
          Entrar
        </button>
        <p className="text-center text-gray-400 text-sm mt-4">Criar uma conta</p>
      </div>
    </div>
  );

  const TaskListScreen = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <header className="bg-white p-6 pt-12 border-b flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Minhas Tarefas</h2>
          <p className="text-sm text-gray-500">{new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="flex gap-3">
          {isSyncing && <RefreshCw className="animate-spin text-orange-500" size={20} />}
          <button onClick={() => setIsOnline(!isOnline)}>
            {isOnline ? <Wifi size={20} className="text-green-600" /> : <WifiOff size={20} className="text-red-500" />}
          </button>
        </div>
      </header>

      {/* Inteligência: Alerta de Atraso */}
      {insights.delayed > 0 && (
        <div className="m-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
          <AlertCircle className="text-red-500" />
          <p className="text-sm text-red-700 font-medium">
            Você tem {insights.delayed} tarefa(s) atrasada(s). Que tal reorganizá-las?
          </p>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all ${task.completed ? 'opacity-60' : ''}`}
          >
            <div className="flex items-center gap-4">
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? 
                  <CheckCircle2 className="text-green-600" size={26} /> : 
                  <Circle className="text-gray-300" size={26} />
                }
              </button>
              <div>
                <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-slate-700'}`}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <Clock size={12} />
                  <span>{task.date === new Date().toISOString().split('T')[0] ? 'Hoje' : task.date}</span>
                  {task.syncPending && <span className="text-orange-500 font-bold">• Pendente Sync</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <button 
        onClick={() => setView('create')}
        className="absolute bottom-24 right-6 w-16 h-16 bg-green-700 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform"
      >
        <Plus size={32} />
      </button>

      <nav className="bg-white border-t p-4 flex justify-around items-center">
        <button onClick={() => setView('list')} className="text-green-700 flex flex-col items-center">
          <ListTodo size={24} />
          <span className="text-[10px] mt-1 font-bold">Tarefas</span>
        </button>
        <button onClick={() => setView('dashboard')} className="text-gray-400 flex flex-col items-center">
          <LayoutDashboard size={24} />
          <span className="text-[10px] mt-1">Dashboard</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center">
          <User size={24} />
          <span className="text-[10px] mt-1">Perfil</span>
        </button>
      </nav>
    </div>
  );

  const CreateTaskScreen = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('2024-04-20');

    return (
      <div className="flex flex-col h-full bg-white">
        <header className="p-6 pt-12 flex items-center border-b">
          <button onClick={() => setView('list')} className="mr-4">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-slate-800">Criar Tarefa</h2>
        </header>

        <main className="p-6 space-y-6">
          <div>
            <label className="text-sm font-bold text-slate-700">Título</label>
            <input 
              autoFocus
              className="w-full p-4 bg-slate-50 border-0 rounded-xl mt-2 focus:ring-2 focus:ring-green-700 outline-none"
              placeholder="Ex: Reunião de Planejamento"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700">Descrição</label>
            <textarea 
              className="w-full p-4 bg-slate-50 border-0 rounded-xl mt-2 focus:ring-2 focus:ring-green-700 outline-none h-32"
              placeholder="Detalhes da tarefa..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700">Data</label>
            <div className="relative mt-2">
              <input 
                type="date"
                className="w-full p-4 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-green-700 outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </main>

        <footer className="mt-auto p-6">
          <button 
            disabled={!title}
            onClick={() => addTask({ title, description: desc, date })}
            className={`w-full py-4 rounded-xl text-white font-bold shadow-lg transition-all ${title ? 'bg-orange-500 active:scale-95' : 'bg-gray-300'}`}
          >
            Salvar Tarefa
          </button>
        </footer>
      </div>
    );
  };

  const SuccessScreen = () => (
    <div className="h-full bg-green-700 flex flex-col items-center justify-center p-8 text-center text-white animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-full p-4 mb-6 shadow-2xl">
        <CheckCircle2 size={80} className="text-green-600" />
      </div>
      <h2 className="text-3xl font-bold mb-2">Tarefa Concluída!</h2>
      <p className="text-xl opacity-90 mb-8">{lastCompletedTask}</p>
      <div className="bg-green-800/50 p-4 rounded-2xl mb-12 border border-green-600/30">
        <p className="text-sm font-medium">Você concluiu esta tarefa!</p>
      </div>
      <button 
        onClick={() => setView('list')}
        className="w-full max-w-xs py-4 bg-orange-500 text-white font-bold rounded-xl shadow-xl hover:bg-orange-600 active:scale-95 transition-all"
      >
        OK
      </button>
    </div>
  );

  const DashboardScreen = () => (
    <div className="flex flex-col h-full bg-slate-50">
       <header className="bg-white p-6 pt-12 border-b">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-sm text-gray-500">Sua produtividade em foco</p>
      </header>

      <main className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mb-3">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-xs text-gray-500 uppercase font-bold">Concluídas</p>
            <p className="text-2xl font-bold text-slate-800">{tasks.filter(t => t.completed).length}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-3">
              <Clock size={20} />
            </div>
            <p className="text-xs text-gray-500 uppercase font-bold">Pendentes</p>
            <p className="text-2xl font-bold text-slate-800">{tasks.filter(t => !t.completed).length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-slate-800">Taxa de Conclusão</h3>
             <BarChart3 className="text-gray-400" size={20} />
          </div>
          <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-green-600 h-full transition-all duration-1000" 
              style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2 font-medium">
            Você completou {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}% das suas metas
          </p>
        </div>

        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle size={24} />
            <h3 className="font-bold">Insight Inteligente</h3>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            {insights.delayed > 0 
              ? `Atenção! Tarefas atrasadas podem afetar sua "streak" de produtividade. Tente resolver ${tasks.find(t => !t.completed && t.date < new Date().toISOString())?.title} primeiro.`
              : "Parabéns! Você está em dia com suas tarefas. Continue assim para manter o foco!"}
          </p>
        </div>
      </main>

      <nav className="bg-white border-t p-4 mt-auto flex justify-around items-center">
        <button onClick={() => setView('list')} className="text-gray-400 flex flex-col items-center">
          <ListTodo size={24} />
          <span className="text-[10px] mt-1">Tarefas</span>
        </button>
        <button onClick={() => setView('dashboard')} className="text-green-700 flex flex-col items-center">
          <LayoutDashboard size={24} />
          <span className="text-[10px] mt-1 font-bold">Dashboard</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center">
          <User size={24} />
          <span className="text-[10px] mt-1">Perfil</span>
        </button>
      </nav>
    </div>
  );

  return (
    <div className="flex justify-center items-center bg-slate-900 min-h-screen font-sans">
      <div className="relative w-full max-w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-slate-800">
        {/* Status Bar Simulado */}
        <div className="absolute top-0 w-full h-8 flex justify-between items-center px-8 pt-2 z-50 pointer-events-none">
          <span className="text-xs font-bold text-slate-800">9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2 bg-slate-800 rounded-full opacity-30" />
            <div className="w-4 h-2 bg-slate-800 rounded-full" />
          </div>
        </div>

        {/* Renderização de Telas */}
        {view === 'login' && <LoginScreen />}
        {view === 'list' && <TaskListScreen />}
        {view === 'create' && <CreateTaskScreen />}
        {view === 'dashboard' && <DashboardScreen />}
        {view === 'success' && <SuccessScreen />}

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-200 rounded-full pointer-events-none" />
      </div>
    </div>
  );
};

export default App;