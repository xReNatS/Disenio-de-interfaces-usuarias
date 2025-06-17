import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Briefcase, User, Search, Building, BarChart2, Info, CheckCircle, Plus, Upload, Trash2, Edit, CalendarDays, Send, Mail, MapPin, Lightbulb } from 'lucide-react';

// Componente para el ítem de navegación de la barra lateral
const SidebarItem = ({ icon: Icon, text, isActive, onClick }) => (
  <button
    className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200
      ${isActive ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
    onClick={onClick}
  >
    {Icon && <Icon size={20} className="mr-3" />}
    <span className="font-medium text-lg">{text}</span>
  </button>
);

// Componente de la barra lateral
const Sidebar = ({ currentPage, navigate, toggleSidebar, isSidebarOpen }) => {
  return (
    <>
      {/* Overlay para cerrar el sidebar en móviles */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        id="sidebar-nav" // ID para el tour de onboarding
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-5 flex flex-col shadow-xl
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between mb-8">
          {/* Hacemos que el logo y el título sean clickeables para navegar a "Mis Prácticas" */}
          <button onClick={() => navigate('my-practices')} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200">
            {/* Reemplazado la 'D' con el logo */}
            <img src="erasebg-transformed.webp" alt="Logo" className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold">Sistema de Prácticas</h1>
          </button>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-6">Departamento de Informática USM</p>

        <nav className="flex-grow space-y-2">
          <SidebarItem
            icon={Briefcase}
            text="Prácticas"
            isActive={currentPage === 'my-practices' || currentPage === 'enroll-practice'}
            onClick={() => navigate('my-practices')}
          />
          <SidebarItem
            icon={User}
            text="Mi perfil"
            isActive={currentPage === 'my-profile'}
            onClick={() => navigate('my-profile')}
          />
          <SidebarItem
            icon={Search}
            text="Ofertas"
            isActive={currentPage === 'offers'}
            onClick={() => navigate('offers')}
          />
          <SidebarItem
            icon={Building}
            text="Empresas"
            isActive={currentPage === 'companies'}
            onClick={() => navigate('companies')}
          />
          <SidebarItem
            icon={BarChart2}
            text="Estadísticas"
            isActive={currentPage === 'statistics'}
            onClick={() => navigate('statistics')}
          />
          <SidebarItem
            icon={Info}
            text="Informaciones"
            isActive={currentPage === 'information'}
            onClick={() => navigate('information')}
          />
        </nav>

        {/* Botón de colapsar (visual, no funcional en este MVP) */}
        <div className="mt-auto pt-4 border-t border-gray-700 flex justify-end">
          <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
            <ChevronDown size={20} className="rotate-90" /> {/* Icono para colapsar/expandir */}
          </button>
        </div>
      </aside>
    </>
  );
};

// Componente para una tarjeta de práctica individual, ahora con capacidad de despliegue
const PracticeCard = ({ title, status, statusColor, children }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si la tarjeta está desplegada

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-4 transition-transform duration-200 hover:scale-[1.01]">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {/* El estado se muestra solo si no está desplegado para el título principal */}
          {!isOpen && status && (
            <p className={`text-sm font-medium ${statusColor}`}>
              {status}
            </p>
          )}
        </div>
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <ChevronDown size={24} className={isOpen ? 'rotate-180' : ''} />
        </button>
      </div>
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          {children} {/* Contenido que se despliega */}
        </div>
      )}
    </div>
  );
};

// Componente para el tour de los apartados de los detalles de la práctica
const PracticeDetailsTourGuide = ({ activeTab, setActiveTab, onCloseTour }) => {
  // Map tab keys to tour step indices for easier management
  const tabToStepIndex = {
    'información': 0,
    'bitácoras': 1,
    'estado': 2,
    'solicitudes': 3,
  };

  const tourSteps = [
    {
      title: "Apartado: INFORMACIÓN",
      description: (
        <>
          <p className="mb-2">Aquí encontrarás un resumen completo de tu práctica, incluyendo:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Práctica:</strong> Estado actual (en proceso, completada, en espera), categoría, modo, progreso y fechas de inicio y, si aplica, término.</li>
            <li><strong>Empresa:</strong> Nombre, dirección y RUT de la organización donde realizas tu práctica.</li>
            <li><strong>Supervisor:</strong> Detalles de contacto de la persona que te supervisa.</li>
            <li><strong>Información General:</strong> Un mensaje rápido sobre el estado general de tu práctica.</li>
            <li><strong>Última Bitácora:</strong> Un vistazo rápido a la última bitácora que has registrado.</li>
          </ul>
        </>
      ),
      tabKey: 'información',
    },
    {
      title: "Apartado: BITÁCORAS",
      description: (
        <>
          <p className="mb-2">En esta sección gestionarás tus registros diarios de actividades:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Calendario:</strong> Visualiza y selecciona los días para añadir o revisar bitácoras.</li>
            <li><strong>Añadir Bitácora del Día:</strong> Un botón para registrar tus actividades diarias, el cual se activa cuando tu práctica está "En Proceso".</li>
            <li><strong>Descargar Bitácoras en PDF:</strong> Opción para exportar un historial de tus bitácoras.</li>
            <li><strong>Detalle de Bitácora:</strong> Muestra las actividades desarrolladas y pendientes del día seleccionado.</li>
          </ul>
        </>
      ),
      tabKey: 'bitácoras',
    },
    {
      title: "Apartado: ESTADO",
      description: (
        <>
          <p className="mb-2">Visualiza el progreso general de tu práctica en este diagrama de flujo:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>En espera:</strong> Tu solicitud de práctica ha sido enviada y está a la espera de confirmación.</li>
            <li><strong>Práctica confirmada:</strong> La empresa ha validado tu práctica y puedes comenzar a registrar bitácoras.</li>
            <li><strong>Práctica finalizada:</strong> Has completado tu práctica y ha sido aprobada.</li>
          </ul>
          <p className="mt-2">El círculo que parpadea indica tu etapa actual en el proceso.</p>
        </>
      ),
      tabKey: 'estado',
    },
    {
      title: "Apartado: SOLICITUDES",
      description: (
        <>
          <p className="mb-2">Esta es tu central de gestión para cualquier cambio o petición relacionada con tu práctica:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Aquí podrás enviar solicitudes para modificar datos, como fechas de inicio/fin, información de la empresa, o cualquier otra configuración que necesites ajustar.</li>
            <li>Si no has realizado ninguna solicitud, verás un mensaje indicándolo.</li>
            <li>Utiliza el botón <strong>"+ AÑADIR SOLICITUD"</strong> para iniciar un nuevo proceso de cambio.</li>
          </ul>
        </>
      ),
      tabKey: 'solicitudes',
    },
  ];

  // Initialize currentTourStepIndex based on activeTab
  const [currentTourStepIndex, setCurrentTourStepIndex] = useState(tabToStepIndex[activeTab] || 0);

  // Sync tour step with activeTab when activeTab changes (e.g., user clicks a tab manually)
  useEffect(() => {
    const newIndex = tabToStepIndex[activeTab];
    if (newIndex !== undefined && newIndex !== currentTourStepIndex) {
      setCurrentTourStepIndex(newIndex);
    }
  }, [activeTab]);

  const currentStepData = tourSteps[currentTourStepIndex];
  const totalSteps = tourSteps.length;
  const progress = ((currentTourStepIndex + 1) / totalSteps) * 100;

  const handleNextClick = () => {
    if (currentTourStepIndex < totalSteps - 1) {
      const newIndex = currentTourStepIndex + 1;
      setCurrentTourStepIndex(newIndex);
      setActiveTab(tourSteps[newIndex].tabKey); // Update active tab in parent
    } else {
      onCloseTour(); // Finalizar tour
    }
  };

  const handlePreviousClick = () => {
    if (currentTourStepIndex > 0) {
      const newIndex = currentTourStepIndex - 1;
      setCurrentTourStepIndex(newIndex);
      setActiveTab(tourSteps[newIndex].tabKey); // Update active tab in parent
    }
  };

  if (!currentStepData) return null; // No renderizar si no hay un paso válido

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl relative max-w-md w-full mx-4 text-white">
        <button
          onClick={onCloseTour}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold mb-3 text-orange-500">{currentStepData.title}</h3>
        <div className="text-gray-300 mb-6 text-sm">
          {currentStepData.description}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
          <div
            className="bg-orange-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between mt-4">
          {currentTourStepIndex > 0 && (
            <button
              onClick={handlePreviousClick}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Atrás
            </button>
          )}
          <button
            onClick={handleNextClick}
            className={`bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ${currentTourStepIndex === 0 ? 'ml-auto' : ''}`}
          >
            {currentTourStepIndex === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
};


// Componente para los detalles de la Práctica Industrial (cuando está en proceso o completada)
const IndustrialPracticeDetails = ({ setIndustrialPracticeStatus, navigate, industrialPracticeStatus, practiceCategory, setPracticeDates, practiceStartDate, practiceEndDate }) => {
  // El estado 'activeTab' se inicializa con 'informacion' para que sea la pestaña predeterminada
  const [activeTab, setActiveTab] = useState('información');
  const [showNewBitacoraForm, setShowNewBitacoraForm] = useState(false); // Estado para mostrar/ocultar el formulario de nueva bitácora
  const [latestBitacora, setLatestBitacora] = useState({ // Estado para la última bitácora
    date: '',
    time: '',
    developedActivity: '',
    pendingActivity: '',
  });
  // Estado para los datos del formulario de nueva bitácora
  const [newBitacoraData, setNewBitacoraData] = useState({
    desdeLas: '08:00',
    hastaLas: '17:00',
    actividadDesarrollada: '',
    actividadPendiente: '',
  });


  // Nuevo estado para controlar la visibilidad del tour de detalles de la práctica
  const [showPracticeDetailsTour, setShowPracticeDetailsTour] = useState(() => {
    // Leer desde localStorage si el tour ya fue visto
    const tourSeen = localStorage.getItem('practiceDetailsTourSeen');
    return tourSeen !== 'true';
  });

  // Efecto para activar el tour de detalles de la práctica si está en estado 'en_espera'
  useEffect(() => {
    if (industrialPracticeStatus === 'en_espera' && !localStorage.getItem('practiceDetailsTourSeen')) {
      setShowPracticeDetailsTour(true);
    }
  }, [industrialPracticeStatus]);

  // Manejador para cerrar el tour de detalles y resetear la pestaña
  const handleDismissPracticeDetailsTour = () => {
    setShowPracticeDetailsTour(false);
    localStorage.setItem('practiceDetailsTourSeen', 'true');
    setActiveTab('información'); // Resetear a la pestaña de Información
  };

  // Efecto para actualizar la fecha actual en la bitácora cuando el componente se monta
  useEffect(() => {
    if (industrialPracticeStatus === 'en_espera') {
      const today = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = today.toLocaleDateString('es-ES', options);
      setLatestBitacora({
        date: formattedDate,
        time: '',
        developedActivity: '',
        pendingActivity: '',
      });
    } else if (industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada') {
        if (!latestBitacora.developedActivity) { // Only set to empty if no bitacora has been added yet
            setLatestBitacora({
                date: '',
                time: '',
                developedActivity: '',
                pendingActivity: '',
            });
        }
    }
  }, [industrialPracticeStatus]);


  // Maneja el cambio en los campos del formulario de bitácora
  const handleBitacoraFormChange = (e) => {
    const { name, value } = e.target;
    setNewBitacoraData(prev => ({ ...prev, [name]: value }));
  };

  // Añade una nueva bitácora
  const handleAddBitacora = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);

    setLatestBitacora({
      date: formattedDate,
      time: `${newBitacoraData.desdeLas} a ${newBitacoraData.hastaLas}`,
      developedActivity: newBitacoraData.actividadDesarrollada,
      pendingActivity: newBitacoraData.actividadPendiente,
    });
    setShowNewBitacoraForm(false); // Oculta el formulario
    setNewBitacoraData({ // Limpia el formulario
      desdeLas: '08:00',
      hastaLas: '17:00',
      actividadDesarrollada: '',
      actividadPendiente: '',
    });
    // Replaced alert with a custom message box for better UX
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white p-4 rounded-lg shadow-lg z-[9999]';
    messageBox.textContent = '¡Bitácora añadida con éxito!';
    document.body.appendChild(messageBox);
    setTimeout(() => {
      document.body.removeChild(messageBox);
    }, 3000);
  };

  // Función para terminar la práctica
  const handleTerminarPractica = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    setPracticeDates(practiceStartDate, formattedDate); // Update parent state with end date
    setIndustrialPracticeStatus('completada'); // Cambiar el estado a "Completada"
    // Replaced alert with a custom message box for better UX
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white p-4 rounded-lg shadow-lg z-[9999]';
    messageBox.textContent = '¡Práctica finalizada con éxito!';
    document.body.appendChild(messageBox);
    setTimeout(() => {
      document.body.removeChild(messageBox);
    }, 3000);
    // No redirigir, solo cambiar el estado en la misma página
  };

  const handleSkipPractice = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    setPracticeDates(formattedDate, ''); // Update parent state with start date, clear end date
    setIndustrialPracticeStatus('en_proceso'); // Transiciona al estado "en_proceso"
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-[9999]';
    messageBox.textContent = 'Estado de práctica actualizado a "En Proceso" (SKIP)';
    document.body.appendChild(messageBox);
    setTimeout(() => {
      document.body.removeChild(messageBox);
    }, 3000);
  };

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleString('es-ES', { month: 'long' });
  const currentYear = today.getFullYear();


  return (
    <div className="text-left">
      {/* Pestañas de navegación */}
      <div className="flex space-x-4 border-b border-gray-700 mb-6 overflow-x-auto pb-2">
        {['INFORMACIÓN', 'BITÁCORAS',
          industrialPracticeStatus === 'completada' && 'INFORME',
          industrialPracticeStatus === 'completada' && 'EVALUACIÓN',
          'ESTADO', 'SOLICITUDES'
        ].filter(Boolean).map((tab) => ( // Filter out false values if tabs are not active
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`py-2 px-4 text-sm font-medium rounded-t-lg transition-colors duration-200 whitespace-nowrap
              ${activeTab === tab.toLowerCase() ? 'bg-orange-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === 'información' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
          {/* Columna izquierda: Detalles de la Práctica */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Práctica</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">Estado:</span>{" "}
                {industrialPracticeStatus === 'en_proceso' ? 'En Proceso' :
                 industrialPracticeStatus === 'completada' ? 'Aprobado' : 'En espera'}
              </p>
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">Categoría:</span>{" "}
                {practiceCategory ? practiceCategory.charAt(0).toUpperCase() + practiceCategory.slice(1).replace(/_/g, ' ') : 'Sin Categoría'}
              </p>
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">Modo:</span> 324 horas
              </p>
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">Progreso:</span>{" "}
                {industrialPracticeStatus === 'en_proceso' ? '0Hrs' : '226 Hr'} {/* Modified: Progress to 0Hrs */}
              </p>
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">Inicio:</span>{" "}
                {practiceStartDate || 'N/A'}
              </p>
              {industrialPracticeStatus === 'completada' && (
                <p className="text-gray-300">
                  <span className="font-medium text-gray-100">Término:</span> {practiceEndDate || 'N/A'}
                </p>
              )}
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Empresa</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">Nombre:</span>{" "}
                {industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada'
                  ? 'Mojang' // Modified: Company Name
                  : 'Nombre de la empresa pendiente de confirmación'}
              </p>
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">Dirección:</span>{" "}
                {industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada'
                  ? 'Sveavägen 41, 111 57 Estocolmo, Suecia' // Modified: Company Address
                  : 'Dirección pendiente de confirmación'}
              </p>
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">RUT:</span>{" "}
                {industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada' ? '55.123.456-9' : 'RUT pendiente de confirmación'} {/* Modified: Company RUT */}
              </p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Supervisor</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">Nombre:</span>{" "}
                {industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada' ? 'Markus Persson' : 'Nombre pendiente de confirmación'}
              </p>
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">Email:</span>{" "}
                {industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada' ? 'markus.persson@mojang.com' : 'Email pendiente de confirmación'}
              </p>
              <p className="text-gray-300">
                <span className="font-medium text-gray-100">Teléfono:</span>{" "}
                {industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada' ? '+46 70 123 45 67' : 'Teléfono pendiente de confirmación'}
              </p>
            </div>
          </div>

          {/* Columna derecha: Información adicional */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Información</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300 text-center">
                {industrialPracticeStatus === 'en_proceso' ? 'TU PRÁCTICA ESTÁ EN PROCESO. INGRESA TU BITÁCORA DIARIA.' :
                 industrialPracticeStatus === 'completada' ? 'TU PRÁCTICA HA SIDO APROBADA EXITOSAMENTE.' :
                 'TU PRÁCTICA ESTÁ EN ESPERA DE CONFIRMACIÓN.'}
              </p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Última bitácora</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              {industrialPracticeStatus === 'en_espera' || (!latestBitacora.developedActivity && (industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada')) ? (
                <p className="text-gray-300 text-center">Vacío</p>
              ) : (
                <>
                  <p className="text-gray-300"><span className="font-medium text-gray-100">{latestBitacora.date}</span></p>
                  <p className="text-gray-300">{latestBitacora.time}</p>
                  <p className="text-gray-300"><span className="font-medium text-gray-100">Actividad desarrollada:</span></p>
                  <p className="text-gray-300 text-sm">{latestBitacora.developedActivity}</p>
                  <p className="text-gray-300"><span className="font-medium text-gray-100">Actividad Pendiente:</span></p>
                  <p className="text-gray-300 text-sm">{latestBitacora.pendingActivity}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}


      {activeTab === 'bitácoras' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left min-h-[400px]"> {/* Added min-h for consistent display */}
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center text-white mb-4">
                <span className="font-semibold text-lg">{currentYear}</span>
              </div>
              <div className="flex justify-between items-center text-white mb-4">
                <button className="text-gray-400 hover:text-white"><ChevronDown size={20} className="rotate-90" /></button>
                <span className="font-semibold">{today.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                <button className="text-gray-400 hover:text-white"><ChevronDown size={20} className="-rotate-90" /></button>
              </div>
              <div className="text-gray-400 text-center mb-2">{currentMonth} de {currentYear}</div>
              <div className="grid grid-cols-7 gap-1 text-center text-gray-400 text-sm mb-4">
                <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-white">
                {/* Días del calendario */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <span key={day} className={`p-1 rounded-full ${day === currentDay ? 'bg-orange-600' : ''}`}>
                    {day}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowNewBitacoraForm(true)} // Muestra el formulario al hacer clic
              disabled={industrialPracticeStatus === 'en_espera' || industrialPracticeStatus === 'completada'}
              className={`w-full bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform
                ${industrialPracticeStatus === 'en_espera' || industrialPracticeStatus === 'completada' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-700 hover:-translate-y-1'}`}
            >
              AÑADIR BITÁCORA DEL DÍA
            </button>
            <button
              disabled={industrialPracticeStatus === 'en_espera' || industrialPracticeStatus === 'completada'}
              className={`w-full bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform
                ${industrialPracticeStatus === 'en_espera' || industrialPracticeStatus === 'completada' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600 hover:-translate-y-1'}`}
            >
              DESCARGAR BITÁCORAS EN PDF
            </button>
          </div>

          {/* Columna derecha: Detalle de la bitácora o formulario de nueva bitácora */}
          {showNewBitacoraForm && industrialPracticeStatus !== 'en_espera' && industrialPracticeStatus !== 'completada' ? (
            <div className="bg-gray-900 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Nueva Bitácora</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="desdeLas" className="block text-gray-400 text-sm mb-1">Desde las:</label>
                  <input
                    type="time"
                    id="desdeLas"
                    name="desdeLas"
                    value={newBitacoraData.desdeLas}
                    onChange={handleBitacoraFormChange}
                    className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label htmlFor="hastaLas" className="block text-gray-400 text-sm mb-1">Hasta las:</label>
                  <input
                    type="time"
                    id="hastaLas"
                    name="hastaLas"
                    value={newBitacoraData.hastaLas}
                    onChange={handleBitacoraFormChange}
                    className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="actividadDesarrollada" className="block text-gray-400 text-sm mb-1">Actividad Desarrollada:</label>
                <textarea
                  id="actividadDesarrollada"
                  name="actividadDesarrollada"
                  value={newBitacoraData.actividadDesarrollada}
                  onChange={handleBitacoraFormChange}
                  maxLength="250"
                  rows="4"
                  className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                  placeholder="Describe las actividades realizadas..."
                ></textarea>
                <p className="text-right text-xs text-gray-500">{newBitacoraData.actividadDesarrollada.length}/250</p>
              </div>
              <div>
                <label htmlFor="actividadPendiente" className="block text-gray-400 text-sm mb-1">Actividad Pendiente:</label>
                <textarea
                  id="actividadPendiente"
                  name="actividadPendiente"
                  value={newBitacoraData.actividadPendiente}
                  onChange={handleBitacoraFormChange}
                  maxLength="250"
                  rows="4"
                  className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                  placeholder="Describe las actividades pendientes..."
                ></textarea>
                <p className="text-right text-xs text-gray-500">{newBitacoraData.actividadPendiente.length}/250</p>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setShowNewBitacoraForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  CANCELAR
                </button>
                <button
                  onClick={handleAddBitacora}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  AÑADIR
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                Bitácora {industrialPracticeStatus === 'en_espera' || (!latestBitacora.developedActivity && (industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada')) ? ' (Vacía)' : `${latestBitacora.date.split(',')[0]}, ${latestBitacora.date.split(',')[1]}`}
              </h3>
              <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                {industrialPracticeStatus === 'en_espera' || (!latestBitacora.developedActivity && (industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada')) ? (
                  <p className="text-gray-300 text-center">Vacío</p>
                ) : (
                  <>
                    <p className="text-gray-300">{latestBitacora.time}</p>
                    <p className="text-gray-300"><span className="font-medium text-gray-100">Actividad desarrollada:</span></p>
                    <p className="text-gray-300 text-sm">{latestBitacora.developedActivity}</p>
                    <p className="text-gray-300"><span className="font-medium text-gray-100">Actividad Pendiente:</span></p>
                    <p className="text-gray-300 text-sm">{latestBitacora.pendingActivity}</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'informe' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left min-h-[400px]"> {/* Added min-h for consistent display */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Tipo de tareas realizadas</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="text-gray-300">Inteligencia Artificial</p>
              <p className="text-gray-300">Documentación de Código</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Beneficios obtenidos</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">No hay Información</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Bases de Datos utilizadas</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">No hay información</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Lenguajes utilizados</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">Python c/ Ruby</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Librerías utilizadas</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">Tensorflow Sc-team Mampy Sicily Pandom</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Asignaturas que le sirvieron</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">Vo miamo</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Como se obtuvo la práctica:</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">Organigrama</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Comentario a la formación entregada por el Departamento de informática US</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">texto</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Opinión sobre la empresa</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">texto</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Optimización</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">geniofic</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Editores utilizados</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">Visual Studies Code</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Sintesis de las tareas</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">texto</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Observaciones al Alumno</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">texto</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'evaluación' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left min-h-[400px]"> {/* Added min-h for consistent display */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Notas</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Capacidad:</span> <span className="text-white">1</span></p>
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Confianza:</span> <span className="text-white">1</span></p>
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Aplicación o Empeño:</span> <span className="text-white">1</span></p>
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Adaptabilidad:</span> <span className="text-white">1</span></p>
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Iniciativa:</span> <span className="text-white">1</span></p>
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Aptitud para trabajar en equipo:</span> <span className="text-white">1</span></p>
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Conocimiento:</span> <span className="text-white">1</span></p>
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Asistencia y Puntualidad:</span> <span className="text-white">1</span></p>
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Logro de resultados:</span> <span className="text-white">1</span></p>
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Comunicación Efectiva:</span> <span className="text-white">1</span></p>
              <p className="text-gray-300 flex justify-between items-center"><span className="font-medium text-gray-100">Manejo de TIC:</span> <span className="text-white">1</span></p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Observaciones de la Evaluación</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">Sin observaciones</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'estado' && (
        <div className="space-y-4 text-left min-h-[400px]">
          <style>
            {`
            @keyframes pulse-orange {
              0%, 100% {
                transform: scale(1);
                opacity: 1;
              }
              50% {
                transform: scale(1.1);
                opacity: 0.7;
              }
            }
            .pulse-animation {
              animation: pulse-orange 1.5s infinite ease-in-out;
            }
            `}
          </style>
          <div className="bg-gray-900 p-4 rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-white mb-6">Progreso de la Práctica</h3>
            <div className="flex items-center justify-between w-full max-w-md mb-8 relative">
              {/* Círculo "En espera..." */}
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors duration-500
                  ${industrialPracticeStatus === 'en_espera' || industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada' ? 'bg-orange-600' : 'bg-gray-700'}
                  ${industrialPracticeStatus === 'en_espera' ? 'pulse-animation' : ''}`}>
                  1
                </div>
                <span className="text-gray-300 text-sm mt-2 whitespace-nowrap">En espera....</span>
              </div>

              {/* Línea divisoria entre 1 y 2 */}
              <div className={`flex-grow border-t-4 border-dashed mx-2 transition-colors duration-500
                ${industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada' ? 'border-orange-600' : 'border-gray-700'}`}></div>

              {/* Círculo "Práctica confirmada" */}
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors duration-500
                  ${industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada' ? 'bg-orange-600' : 'bg-gray-700'}
                  ${industrialPracticeStatus === 'en_proceso' ? 'pulse-animation' : ''}`}>
                  2
                </div>
                <span className="text-gray-300 text-sm mt-2 whitespace-nowrap">Práctica confirmada</span>
              </div>

              {/* Línea divisoria entre 2 y 3 */}
              <div className={`flex-grow border-t-4 border-dashed mx-2 transition-colors duration-500
                ${industrialPracticeStatus === 'completada' ? 'border-orange-600' : 'border-gray-700'}`}></div>

              {/* Círculo "Práctica finalizada" */}
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors duration-500
                  ${industrialPracticeStatus === 'completada' ? 'bg-orange-600' : 'bg-gray-700'}
                  ${industrialPracticeStatus === 'completada' ? 'pulse-animation' : ''}`}>
                  3
                </div>
                <span className="text-gray-300 text-sm mt-2 whitespace-nowrap">Práctica finalizada</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center">
            {industrialPracticeStatus === 'en_espera' && (
              <p className="text-gray-300 text-lg">Tu práctica está en espera de confirmación. Te notificaremos cuando haya cambios.</p>
            )}
            {industrialPracticeStatus === 'en_proceso' && (
              <p className="text-gray-300 text-lg">¡Tu práctica ha sido confirmada! Puedes comenzar a ingresar bitácoras.</p>
            )}
            {industrialPracticeStatus === 'completada' && (
              <p className="text-gray-300 text-lg">¡Felicidades! Tu práctica ha sido completada exitosamente.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'solicitudes' && (
        <div className="text-center py-10 min-h-[400px] flex flex-col items-center justify-between">
          <p className="text-gray-300 text-lg mb-8">
            En esta sección podrás hacer una solicitud para cambiar algún dato o configuración de tu práctica.
          </p>
          <div className="flex-grow flex items-center justify-center">
            {/* SVG custom icon: Magnifying glass with a cross */}
            <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Handle of the magnifying glass */}
              <rect x="130" y="130" width="10" height="50" rx="5" transform="rotate(45 130 130)" fill="#F97316"/>
              {/* Magnifying glass circle */}
              <circle cx="100" cy="100" r="40" stroke="#F97316" strokeWidth="10"/>
              {/* Cross in the center */}
              <line x1="80" y1="100" x2="120" y2="100" stroke="#F97316" strokeWidth="5" strokeLinecap="round"/>
              <line x1="100" y1="80" x2="100" y2="120" stroke="#F97316" strokeWidth="5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-gray-400 mb-8">No has realizado ninguna solicitud</p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
            + AÑADIR SOLICITUD
          </button>
        </div>
      )}

      {/* Botones al final */}
      {industrialPracticeStatus === 'en_proceso' ? (
        <div className="flex justify-end items-center mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={handleTerminarPractica}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            TERMINAR PRÁCTICA
          </button>
        </div>
      ) : industrialPracticeStatus === 'en_espera' ? (
        <div className="flex justify-end items-center mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={handleSkipPractice}
            className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            SKIP
          </button>
        </div>
      ) : null}

      {/* Tour de Detalles de Práctica */}
      {showPracticeDetailsTour && industrialPracticeStatus === 'en_espera' && (
        <PracticeDetailsTourGuide
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onCloseTour={handleDismissPracticeDetailsTour}
        />
      )}
    </div>
  );
};


// Componente de la página "Mis Prácticas"
const MyPracticesPage = ({ navigate, industrialPracticeStatus, setIndustrialPracticeStatus, practiceCategory, practiceStartDate, practiceEndDate, setPracticeDates }) => {
  return (
    <div id="my-practices-section" className="p-6"> {/* ID para el tour de onboarding */}
      <h2 className="text-3xl font-bold text-white mb-6">Mis Prácticas</h2>

      <div className="space-y-4">
        {/* Práctica Industrial: ahora con estado "No iniciada", "En Proceso", "En espera" o "Completada" */}
        <PracticeCard
          title="Práctica Industrial"
          status={
            industrialPracticeStatus === 'en_proceso'
              ? 'En Proceso'
              : industrialPracticeStatus === 'completada'
              ? 'Completada'
              : industrialPracticeStatus === 'en_espera'
              ? 'En espera'
              : 'No iniciada'
          }
          statusColor={
            industrialPracticeStatus === 'en_proceso'
              ? 'text-yellow-400'
              : industrialPracticeStatus === 'completada'
              ? 'text-green-400'
              : industrialPracticeStatus === 'en_espera'
              ? 'text-gray-400' // Changed to gray for "En espera" text on the card
              : 'text-red-400'
          }
        >
          {industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada' || industrialPracticeStatus === 'en_espera' ? (
            <IndustrialPracticeDetails
              setIndustrialPracticeStatus={setIndustrialPracticeStatus}
              navigate={navigate}
              industrialPracticeStatus={industrialPracticeStatus} // Pass industrialPracticeStatus to details
              practiceCategory={practiceCategory}
              setPracticeDates={setPracticeDates} // Pass the setter function
              practiceStartDate={practiceStartDate}
              practiceEndDate={practiceEndDate}
            />
          ) : (
            <>
              <p className="text-gray-300 mb-4">
                Detalles de tu práctica industrial. Actualmente no hay un proceso activo.
              </p>
              <div className="flex flex-col items-center justify-center p-8 bg-gray-700 rounded-lg shadow-inner">
                <Briefcase size={64} className="text-orange-400 mb-4" />
                <p className="text-gray-200 text-lg text-center mb-4">
                  Inicia tu experiencia profesional registrando tu práctica industrial. Sigue los pasos para completar la inscripción.
                </p>
                <p className="text-gray-400 text-sm text-center">
                  Una vez inscrita, podrás gestionar tus bitácoras y ver el progreso de tu práctica.
                </p>
              </div>
              <button
                id="enroll-practice-button" // ID para el tour de onboarding
                onClick={() => navigate('enroll-practice')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg mt-6"
              >
                Inscribir Prácticas
              </button>
            </>
          )}
        </PracticeCard>

        {/* Práctica Profesional: mantiene su estado "No iniciada" */}
        <PracticeCard title="Práctica Profesional" status="No iniciada" statusColor="text-red-400">
          <p className="text-gray-300 mb-4">
            Detalles de tu práctica profesional. Puedes iniciar el proceso cuando estés listo.
          </p>
          {/* Aquí podrías añadir más botones o información relevante a la práctica profesional */}
        </PracticeCard>
      </div>
      {/* La sección "Gestión de Prácticas" ha sido eliminada */}
    </div>
  );
};

// Nuevo componente para el tour de inscripción
const EnrollmentTourGuide = ({ currentFormStep, setCurrentFormStep, onCloseTour }) => {
  // Maneja el progreso interno del tour de inscripción
  const [currentTourStepIndex, setCurrentTourStepIndex] = useState(currentFormStep - 1);

  // Sincroniza el paso del tour con el paso del formulario si cambia externamente
  useEffect(() => {
    setCurrentTourStepIndex(currentFormStep - 1);
  }, [currentFormStep]);

  const tourSteps = [
    {
      title: "Paso 1: Selecciona el Tipo de Práctica",
      description: (
        <>
          <p className="mb-2">Este es el punto de partida. Debes decidir si vas a:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Iniciar Práctica:</strong> Si vas a comenzar una práctica nueva, ya sea en una empresa o de tipo investigativa.
            </li>
            <li>
              <strong>Convalidar Práctica:</strong> Si ya has realizado una actividad (como un trabajo en una empresa, un proyecto de investigación, trabajo social o emprendimiento) que deseas que sea reconocida como tu práctica.
            </li>
          </ul>
          <p className="mt-2">Al seleccionar una opción, la aplicación avanzará automáticamente al siguiente paso.</p>
        </>
      ),
    },
    {
      title: "Paso 2: Selecciona la Categoría de Práctica",
      description: (
        <>
          <p className="mb-2">Dependiendo del tipo de práctica que hayas elegido en el Paso 1, se te presentarán diferentes categorías:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Si elegiste "Iniciar Práctica":</strong>
              <ul className="list-circle list-inside ml-6">
                <li>
                  <strong>Práctica en una empresa:</strong> Para prácticas tradicionales en el sector privado o público.
                </li>
                <li>
                  <strong>Práctica investigativa:</strong> Para prácticas enfocadas en proyectos de investigación.
                </li>
              </ul>
            </li>
            <li>
              <strong>Si elegiste "Convalidar Práctica":</strong>
              <ul className="list-circle list-inside ml-6">
                <li>
                  <strong>Empresa o Institución:</strong> Para convalidar una experiencia laboral o de colaboración con una institución.
                </li>
                <li>
                  <strong>Investigativa:</strong> Para convalidar un trabajo de investigación.
                </li>
                <li>
                  <strong>Trabajo Social:</strong> Para convalidar experiencias en el ámbito social.
                </li>
                <li>
                  <strong>Emprendimiento:</strong> Para convalidar la experiencia de iniciar y desarrollar un proyecto propio.
                </li>
              </ul>
            </li>
          </ul>
          <p className="mt-2">Al seleccionar una categoría, el sistema te llevará al siguiente paso.</p>
        </>
      ),
    },
    {
      title: "Paso 3: Confirma los Requisitos",
      description: (
        <>
          <p className="mb-2">Este paso te proporciona información crucial sobre los requisitos para iniciar tu práctica. Es fundamental que leas y entiendas esta sección.</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Información Relevante:</strong> Se te indicará qué tipo de datos necesitarás de la institución o empresa donde realizarás tu práctica, incluyendo:
              <ul className="list-circle list-inside ml-6">
                <li>Nombre, RUT y dirección de la institución.</li>
                <li>Nombre, correo electrónico y teléfono de contacto de tu supervisor/a.</li>
              </ul>
            </li>
            <li>
              <strong>Confirmación:</strong> Debes marcar la casilla "Confirmo que cumplo con todos los requisitos." Este paso asegura que estás al tanto de la información necesaria antes de proceder a la fase de llenado de datos.
            </li>
            <li>
              <strong>Avance:</strong> El botón "SIGUIENTE" estará deshabilitado hasta que marques la casilla de confirmación.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Paso 4: Rellena los Datos de la Práctica",
      description: (
        <>
          <p className="mb-2">Este es el paso final donde ingresarás toda la información detallada sobre tu práctica. Los campos están organizados en secciones claras:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Datos de la Empresa:</strong> Completa el Nombre, Dirección y RUT de la empresa o institución.
            </li>
            <li>
              <strong>Datos del Supervisor:</strong> Ingresa el Nombre, Email y Teléfono de contacto de tu supervisor.
            </li>
            <li>
              <strong>Detalles de la Práctica:</strong> Selecciona la Fecha de Inicio y las Horas Totales de tu práctica (ej. 162 o 324 horas).
            </li>
            <li>
              <strong>Consideración especial (opcional):</strong> Un campo de texto donde puedes añadir cualquier comentario sobre condiciones especiales (ej. situación financiera, diagnóstico TEA). Esta información es confidencial.
            </li>
          </ul>
          <p className="mt-2">Una vez que hayas completado todos los campos obligatorios, haz clic en el botón "INGRESAR PRÁCTICA".</p>
        </>
      ),
    },
  ];

  const currentStepData = tourSteps[currentTourStepIndex];
  const totalSteps = tourSteps.length;
  const progress = ((currentTourStepIndex + 1) / totalSteps) * 100;

  const handleNextClick = () => {
    if (currentTourStepIndex < totalSteps - 1) {
      const newTourStepIndex = currentTourStepIndex + 1;
      setCurrentTourStepIndex(newTourStepIndex);
      setCurrentFormStep(newTourStepIndex + 1); // Sincroniza el paso del formulario
    } else {
      onCloseTour(); // Finalizar tour y redirigir
    }
  };

  const handlePreviousClick = () => {
    if (currentTourStepIndex > 0) {
      const newTourStepIndex = currentTourStepIndex - 1;
      setCurrentTourStepIndex(newTourStepIndex);
      setCurrentFormStep(newTourStepIndex + 1); // Sincroniza el paso del formulario
    }
  };

  if (!currentStepData) return null; // No renderizar si no hay un paso válido

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl relative max-w-md w-full mx-4 text-white">
        <button
          onClick={onCloseTour} // Cierra y redirige a la página principal
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold mb-3 text-orange-500">{currentStepData.title}</h3>
        <div className="text-gray-300 mb-6 text-sm">
          {currentStepData.description}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
          <div
            className="bg-orange-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between mt-4">
          {currentTourStepIndex > 0 && (
            <button
              onClick={handlePreviousClick}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Atrás
            </button>
          )}
          <button
            onClick={handleNextClick}
            className={`bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ${currentTourStepIndex === 0 ? 'ml-auto' : ''}`}
          >
            {currentTourStepIndex === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de la nueva página "Inscribir Práctica"
const EnrollPracticePage = ({ navigate, setIndustrialPracticeStatus, setPracticeCategory, setPracticeDates }) => {
  const [currentStep, setCurrentStep] = useState(1); // Estado para controlar el paso actual (1: Tipo, 2: Categoría, etc.)
  const [practiceType, setPracticeTypeState] = useState(null); // 'iniciar' o 'convalidar'
  const [practiceCategoryState, setPracticeCategoryState] = useState(null); // 'empresa', 'investigativa', 'industrial', 'profesional', 'emprendimiento'
  const [meetsRequirements, setMeetsRequirements] = useState(false); // Si cumple los requisitos
  const [formData, setFormData] = useState({ // Datos del formulario
    companyName: '',
    companyAddress: '',
    companyRut: '',
    supervisorName: '',
    supervisorEmail: '',
    supervisorPhone: '',
    startDate: '',
    hours: '324', // Default to 324 hours
  });

  const totalFormSteps = 4;
  const stepNames = ['Tipo', 'Categoría', 'Requisitos', 'Datos'];

  // Estado y efecto para controlar el tour de inscripción
  const [showEnrollmentTour, setShowEnrollmentTour] = useState(() => {
    // Leer desde localStorage si el tour ya fue visto
    const tourSeen = localStorage.getItem('enrollmentTourSeen');
    return tourSeen !== 'true';
  });


  // Función para cerrar el tour de inscripción y marcarlo como visto
  const handleDismissEnrollmentTour = () => {
    setShowEnrollmentTour(false);
    localStorage.setItem('enrollmentTourSeen', 'true'); // Marcar el tour como visto
    setCurrentStep(1); // Reiniciar al Paso 1
  };


  // Función para avanzar al siguiente paso del formulario
  const handleNextStep = () => {
    if (currentStep < totalFormSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Función para retroceder al paso anterior del formulario
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Si estamos en el primer paso y presionamos atrás, volvemos a "Mis Prácticas"
      navigate('my-practices');
    }
  };

  // Función para seleccionar el tipo de práctica (Iniciar o Convalidar)
  const selectPracticeType = (type) => {
    setPracticeTypeState(type);
    handleNextStep(); // Automatically move to the next step
  };

  // Función para seleccionar la categoría de práctica
  const selectPracticeCategoryAndNavigate = (category) => {
    setPracticeCategoryState(category);
    setPracticeCategory(category); // Update parent state
    handleNextStep(); // Automatically move to the next step
  };

  // Maneja el cambio en los campos del formulario de datos
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función para finalizar la inscripción y cambiar el estado de la práctica
  const handleIngresarPractica = () => {
    setIndustrialPracticeStatus('en_espera'); // Cambiar el estado de la práctica industrial a "En espera"
    // Marcar el tour como visto al completar la inscripción
    localStorage.setItem('enrollmentTourSeen', 'true');
    setShowEnrollmentTour(false); // Ocultar el tour si aún está visible

    // Replaced alert with a custom message box for better UX
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white p-4 rounded-lg shadow-lg z-[9999]';
    messageBox.textContent = '¡Práctica ingresada con éxito! Esperando confirmación.';
    document.body.appendChild(messageBox);
    setTimeout(() => {
      document.body.removeChild(messageBox);
    }, 3000);
    navigate('my-practices'); // Redirigir a la página "Mis Prácticas"
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Inscribir Práctica</h2>

      {/* Barra de progreso del formulario */}
      <div className="mb-8">
        <div className="flex justify-between text-gray-400 text-sm mb-2">
          {stepNames.map((name, index) => (
            <span key={name} className={`${index + 1 <= currentStep ? 'text-orange-500 font-semibold' : ''}`}>
              Paso {index + 1}: {name}
            </span>
          ))}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-orange-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / totalFormSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg min-h-[500px] flex flex-col justify-between">
        {/* Contenido de los pasos del formulario */}
        {currentStep === 1 && (
          <div className="text-center flex flex-col justify-center flex-grow">
            <h3 className="text-2xl font-semibold text-white mb-12" id="tour-step1-title">Selecciona el tipo de práctica</h3> {/* ID para el tour */}
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button
                onClick={() => selectPracticeType('iniciar')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center"
                id="tour-step1-iniciar" // ID para el tour
              >
                <Plus size={32} className="mb-2" />
                Iniciar Práctica
              </button>
              <button
                onClick={() => selectPracticeType('convalidar')}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center"
                id="tour-step1-convalidar" // ID para el tour
              >
                <CheckCircle size={32} className="mb-2" />
                Convalidar Práctica
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="text-center flex flex-col justify-center flex-grow">
            <h3 className="text-2xl font-semibold text-white mb-12" id="tour-step2-title">Selecciona la categoría de práctica</h3> {/* ID para el tour */}
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
              {practiceType === 'iniciar' && (
                <>
                  <button
                    onClick={() => selectPracticeCategoryAndNavigate('empresa')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center"
                    id="tour-step2-empresa" // ID para el tour
                  >
                    <Building size={32} className="mb-2" />
                    Práctica en una empresa
                  </button>
                  <button
                    onClick={() => selectPracticeCategoryAndNavigate('investigativa')}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center"
                    id="tour-step2-investigativa" // ID para el tour
                  >
                    <Search size={32} className="mb-2" />
                    Práctica investigativa
                  </button>
                </>
              )}
              {practiceType === 'convalidar' && (
                <>
                  <button
                    onClick={() => selectPracticeCategoryAndNavigate('empresa_institucion')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center"
                    id="tour-step2-empresa-institucion" // ID para el tour
                  >
                    <Building size={32} className="mb-2" />
                    Empresa o Institución
                  </button>
                  <button
                    onClick={() => selectPracticeCategoryAndNavigate('investigativa')}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center"
                    id="tour-step2-investigativa-convalidar" // ID para el tour
                  >
                    <Search size={32} className="mb-2" />
                    Investigativa
                  </button>
                  <button
                    onClick={() => selectPracticeCategoryAndNavigate('trabajo_social')}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center"
                    id="tour-step2-trabajo-social" // ID para el tour
                  >
                    <User size={32} className="mb-2" />
                    Trabajo Social
                  </button>
                  <button
                    onClick={() => selectPracticeCategoryAndNavigate('emprendimiento')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex flex-col items-center"
                    id="tour-step2-emprendimiento" // ID para el tour
                  >
                    <Lightbulb size={32} className="mb-2" />
                    Emprendimiento
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-left space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center" id="tour-step3-title">
              <Info size={28} className="text-orange-500 mr-3" />
              Información para iniciar tu práctica
            </h3>
            <div className="bg-gray-900 p-6 rounded-lg space-y-4" id="tour-step3-info"> {/* ID para el tour */}
              <p className="text-gray-300">
                Para iniciar una práctica investigativa, el proceso es el mismo que con una empresa, necesitas haberte contactado con una institución y haber sido aceptado para realizar ahí tu práctica.
              </p>
              <p className="text-gray-300">
                Una vez ya conseguida debes obtener los siguientes datos:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                <li>Nombre, RUT y dirección de la institución.</li>
                <li>Nombre, e-mail y teléfono de contacto de alguna persona de la institución la cual será el supervisor o supervisora que valide que estarás realizando tu práctica allí y posteriormente evaluará tu desempeño.</li>
              </ul>
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="meetsRequirements" // Usar este ID único para el input y para el tour
                checked={meetsRequirements}
                onChange={(e) => setMeetsRequirements(e.target.checked)}
                className="form-checkbox h-5 w-5 text-orange-600 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
              />
              <label htmlFor="meetsRequirements" className="ml-3 text-gray-300 text-lg">
                Confirmo que cumplo con todos los requisitos.
              </label>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-left space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-4" id="tour-step4-title">Datos de la Práctica</h3> {/* ID para el tour */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sección Empresa */}
              <div className="space-y-4" id="tour-step4-company-data"> {/* ID para el tour */}
                <h4 className="text-xl font-semibold text-white flex items-center mb-2"><Building size={20} className="mr-2"/> Datos de la Empresa</h4>
                <div>
                  <label htmlFor="companyName" className="block text-gray-400 text-sm mb-1">Nombre de la Empresa:</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Ej: Google Chile"
                  />
                </div>
                <div>
                  <label htmlFor="companyAddress" className="block text-gray-400 text-sm mb-1">Dirección:</label>
                  <input
                    type="text"
                    id="companyAddress"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Ej: Av. Isidora Goyenechea 3000"
                  />
                </div>
                <div>
                  <label htmlFor="companyRut" className="block text-gray-400 text-sm mb-1">RUT de la Empresa:</label>
                  <input
                    type="text"
                    id="companyRut"
                    name="companyRut"
                    value={formData.companyRut}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Ej: 76.123.456-7"
                  />
                </div>
              </div>

              {/* Sección Supervisor */}
              <div className="space-y-4" id="tour-step4-supervisor-data"> {/* ID para el tour */}
                <h4 className="text-xl font-semibold text-white flex items-center mb-2"><User size={20} className="mr-2"/> Datos del Supervisor</h4>
                <div>
                  <label htmlFor="supervisorName" className="block text-gray-400 text-sm mb-1">Nombre del Supervisor:</label>
                  <input
                    type="text"
                    id="supervisorName"
                    name="supervisorName"
                    value={formData.supervisorName}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
                <div>
                  <label htmlFor="supervisorEmail" className="block text-gray-400 text-sm mb-1">Email del Supervisor:</label>
                  <input
                    type="email"
                    id="supervisorEmail"
                    name="supervisorEmail"
                    value={formData.supervisorEmail}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Ej: juan.perez@empresa.com"
                  />
                </div>
                <div>
                  <label htmlFor="supervisorPhone" className="block text-gray-400 text-sm mb-1">Teléfono del Supervisor:</label>
                  <input
                    type="tel"
                    id="supervisorPhone"
                    name="supervisorPhone"
                    value={formData.supervisorPhone}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Ej: +56912345678"
                  />
                </div>
              </div>
            </div>

            {/* Sección Fechas y Horas */}
            <div className="space-y-4 mt-6" id="tour-step4-practice-details"> {/* ID para el tour */}
              <h4 className="text-xl font-semibold text-white flex items-center mb-2"><CalendarDays size={20} className="mr-2"/> Detalles de la Práctica</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-gray-400 text-sm mb-1">Fecha de Inicio:</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label htmlFor="hours" className="block text-gray-400 text-sm mb-1">Horas Totales:</label>
                  <select
                    id="hours"
                    name="hours"
                    value={formData.hours}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="162">162 horas</option>
                    <option value="324">324 horas</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-semibold text-white flex items-center mb-2"><Lightbulb size={20} className="mr-2"/> Consideración especial (opcional)</h4>
                <p className="text-gray-300 text-sm mb-2">
                  Si al momento de realizar la práctica tienes algún comentario respecto a alguna
                  condición a considerar, por favor indícanoslo aquí. (Ej: Situación financiera, estás
                  diagnostificado con TEA, entre otros...)
                </p>
                <p className="text-gray-400 text-xs mb-4">
                  Esta información será totalmente confidencial y solamente el profesor y
                  ayudante encargados tendrán acceso.
                </p>
                <textarea
                  id="specialConsideration"
                  name="specialConsideration"
                  value={formData.specialConsideration}
                  onChange={handleFormChange}
                  rows="4"
                  className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                  placeholder="Consideración especial"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Botones de navegación de pasos del formulario */}
        <div className="flex justify-between mt-8 pt-4 border-t border-gray-700">
          <button
            onClick={handlePreviousStep}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            {currentStep === 1 ? 'CANCELAR' : 'ANTERIOR'}
          </button>
          {currentStep < totalFormSteps && currentStep !== 1 ? ( // Only show SIGUIENTE if not step 1
            <button
              onClick={handleNextStep}
              disabled={currentStep === 3 && !meetsRequirements} // Deshabilita si no se cumplen los requisitos en el paso 3
              className={`bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5
                ${currentStep === 3 && !meetsRequirements ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              SIGUIENTE
            </button>
          ) : currentStep === totalFormSteps ? (
            <button
              onClick={handleIngresarPractica}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              INGRESAR PRÁCTICA
            </button>
          ) : null} {/* Render nothing for SIGUIENTE button on Step 1 */}
        </div>
      </div>

      {/* Tour de Inscripción */}
      {showEnrollmentTour && (
        <EnrollmentTourGuide
          currentFormStep={currentStep} // Pasa el paso actual del formulario al tour
          setCurrentFormStep={setCurrentStep} // Pasa la función para actualizar el paso del formulario
          onCloseTour={handleDismissEnrollmentTour}
        />
      )}
    </div>
  );
};


// Componente para mostrar una tarjeta de oferta de práctica
const OfferCard = ({ company, location, contact, details, date }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
      <div className="flex items-center">
        <Building size={20} className="text-orange-500 mr-2" />
        <span className="text-gray-300 font-medium">Empresa:</span>
        <span className="text-white ml-2">{company}</span>
      </div>
      <div className="flex items-center">
        <MapPin size={20} className="text-orange-500 mr-2" />
        <span className="text-gray-300 font-medium">Ubicación:</span>
        <span className="text-white ml-2">{location}</span>
      </div>
      <div className="flex items-center">
        <Mail size={20} className="text-orange-500 mr-2" />
        <span className="text-gray-300 font-medium">Contactar a:</span>
        <a href={`mailto:${contact}`} className="text-blue-400 hover:underline ml-2 break-all">{contact}</a>
      </div>
    </div>
    <div className="border-t border-gray-700 pt-4 mt-4">
      <h4 className="text-lg font-semibold text-white mb-2">Detalles:</h4>
      <p className="text-gray-300 text-sm whitespace-pre-line">{details}</p>
      <p className="text-gray-500 text-xs text-right mt-4">{date}</p>
    </div>
  </div>
);

// Componente de la página "Ofertas"
const OffersPage = () => {
  const offers = [
    {
      company: 'TS Latam SpA',
      location: 'Santiago, Chile',
      contact: 'marcoignacio@tslatam.com',
      details: 'Empresa informática dedicada al desarrollo de aplicaciones web para la industria del turismo, ecommerce y pagos.',
      date: 'miércoles, 8 de noviembre, 2023',
    },
    {
      company: 'Heitmann Ingeniería y Asesoría Ltda',
      location: 'Villa Alemana, Chile',
      contact: 'administracion@heitmann.cl',
      details: 'Práctica para técnico universitario electrónico\nNúmero de cupos: 1\nHorario: lunes a jueves, de 8.30 a 18.00, con 1 hora de colación, y los viernes de 7.30 a 17.00, con 1 hora de colación.\nPago práctica: 80.000 líquidos mensuales\nLugar de práctica: Ojos de Agua 219, Villa Alemana',
      date: 'jueves, 12 de octubre, 2023',
    },
    { // New offer added based on the previous conversation history
      company: 'Mojang',
      location: 'Estocolmo, Suecia',
      contact: 'jobs@mojang.com',
      details: 'Estamos buscando ingenieros de software talentosos para unirse a nuestro equipo de desarrollo de juegos. Experiencia en Java/C++ y pasión por los videojuegos es un plus.',
      date: 'viernes, 17 de mayo, 2024',
    },
  ];

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Ofertas de Prácticas</h2>
      <div className="space-y-6">
        {offers.map((offer, index) => (
          <OfferCard
            key={index}
            company={offer.company}
            location={offer.location}
            contact={offer.contact}
            details={offer.details}
            date={offer.date}
          />
        ))}
      </div>
    </div>
  );
};

// Placeholder components for other pages
const MyProfilePage = () => (
  <div className="p-6 text-white">
    <h2 className="text-3xl font-bold mb-6">Mi Perfil</h2>
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg min-h-[400px] flex items-center justify-center">
      <p className="text-gray-300 text-lg">Contenido de la página "Mi Perfil" en construcción.</p>
    </div>
  </div>
);

const CompaniesPage = () => (
  <div className="p-6 text-white">
    <h2 className="text-3xl font-bold mb-6">Empresas</h2>
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg min-h-[400px] flex items-center justify-center">
      <p className="text-gray-300 text-lg">Información sobre las empresas colaboradoras.</p>
    </div>
  </div>
);

const StatisticsPage = () => (
  <div className="p-6 text-white">
    <h2 className="text-3xl font-bold mb-6">Estadísticas</h2>
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg min-h-[400px] flex items-center justify-center">
      <p className="text-gray-300 text-lg">Visualiza estadísticas de prácticas aquí.</p>
    </div>
  </div>
);

const InformationPage = () => (
  <div className="p-6 text-white">
    <h2 className="text-3xl font-bold mb-6">Informaciones</h2>

    <div className="space-y-8">
      {/* Sección "¿Quieres saber sobre el proceso de prácticas?" */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        <h3 className="text-xl font-semibold text-white mb-4">¿Quieres saber sobre el proceso de prácticas?</h3>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
          REVISAR PROCESO
        </button>
      </div>

      {/* Sección "Revisa las preguntas frecuentes si tienes dudas" */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Revisa las preguntas frecuentes si tienes dudas</h3>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
          PREGUNTAS FRECUENTES
        </button>
      </div>

      {/* Sección "Revisa la charla de prácticas" */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4 text-center">Revisa la charla de prácticas</h3>
        <div className="relative w-full overflow-hidden rounded-lg mb-6" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/zCjyUdq32Ic" // Enlace del video actualizado
            title="Proceso Prácticas 2025"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="text-center">
          <a
            href="https://drive.google.com/file/d/1ka8OQcbP_Ob-FX9fzK0xNHdIjBgX2wOy/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            PRESENTACIÓN DE LA CHARLA
          </a>
        </div>
      </div>
    </div>
  </div>
);


const App = () => {
  const [currentPage, setCurrentPage] = useState('my-practices'); // Página inicial: Mis Prácticas
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para el sidebar en móviles
  const [industrialPracticeStatus, setIndustrialPracticeStatus] = useState('no_iniciada'); // Nuevo estado para la práctica industrial
  const [industrialPracticeCategory, setIndustrialPracticeCategory] = useState(null); // Nueva categoría para la práctica industrial
  const [industrialPracticeStartDate, setIndustrialPracticeStartDate] = useState('');
  const [industrialPracticeEndDate, setIndustrialPracticeEndDate] = useState('');

  const navigate = (page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false); // Cerrar sidebar al navegar
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const setPracticeDates = (startDate, endDate) => {
    setIndustrialPracticeStartDate(startDate);
    setIndustrialPracticeEndDate(endDate);
  };


  // Renderiza la página actual basada en el estado
  const renderPage = () => {
    switch (currentPage) {
      case 'my-practices':
        return <MyPracticesPage
          navigate={navigate}
          industrialPracticeStatus={industrialPracticeStatus}
          setIndustrialPracticeStatus={setIndustrialPracticeStatus}
          practiceCategory={industrialPracticeCategory}
          practiceStartDate={industrialPracticeStartDate}
          practiceEndDate={industrialPracticeEndDate}
          setPracticeDates={setPracticeDates}
        />;
      case 'enroll-practice':
        return <EnrollPracticePage navigate={navigate} setIndustrialPracticeStatus={setIndustrialPracticeStatus} setPracticeCategory={setIndustrialPracticeCategory} setPracticeDates={setPracticeDates} />;
      case 'my-profile':
        return <MyProfilePage />;
      case 'offers':
        return <OffersPage />;
      case 'companies':
        return <CompaniesPage />;
      case 'statistics':
        return <StatisticsPage />;
      case 'information':
        return <InformationPage />;
      default:
        return <MyPracticesPage
          navigate={navigate}
          industrialPracticeStatus={industrialPracticeStatus}
          setIndustrialPracticeStatus={setIndustrialPracticeStatus}
          practiceCategory={industrialPracticeCategory}
          practiceStartDate={industrialPracticeStartDate}
          practiceEndDate={industrialPracticeEndDate}
          setPracticeDates={setPracticeDates}
        />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 font-sans">
      {/* Botón de menú para móviles */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-white p-2 rounded-md bg-gray-800 shadow-lg">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        navigate={navigate}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Contenido principal */}
      <main className="flex-grow p-4 lg:ml-64 transition-all duration-300 ease-in-out">
        {/* Header para el contenido principal */}
        <header className="flex justify-end items-center py-4 px-6 bg-gray-800 rounded-xl shadow-lg mb-6">
          {/* Eliminado el div con id="user-profile-section" */}
        </header>

        {renderPage()}
      </main>
    </div>
  );
};

export default App;
