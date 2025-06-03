import React, { useState } from 'react';
import { ChevronDown, Menu, X, Briefcase, User, Search, Building, BarChart2, Info, CheckCircle, Plus, Upload, Trash2, Edit, CalendarDays, Send, Mail, MapPin } from 'lucide-react'; // Importar iconos de Lucide React, añadiendo Mail y MapPin

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
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-5 flex flex-col shadow-xl
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            {/* Logo o icono del Sistema de Prácticas */}
            <span className="text-orange-500 text-3xl font-bold mr-2">D</span>
            <h1 className="text-2xl font-bold">Sistema de Prácticas</h1>
          </div>
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

// Componente para los detalles de la Práctica Industrial (cuando está en proceso o completada)
const IndustrialPracticeDetails = ({ setIndustrialPracticeStatus, navigate, industrialPracticeStatus }) => {
  const [activeTab, setActiveTab] = useState('informacion'); // Estado para la pestaña activa, por defecto "informacion"
  const [showNewBitacoraForm, setShowNewBitacoraForm] = useState(false); // Estado para mostrar/ocultar el formulario de nueva bitácora
  const [latestBitacora, setLatestBitacora] = useState({ // Estado para la última bitácora
    date: '23 de mayo del 2025',
    time: '09:00 a 18:30',
    developedActivity: 'Creación y familiarización con el portal de Azure + creación grupos y recursos tipo testing',
    pendingActivity: 'No hay actividades pendientes.',
  });

  // Estado para los campos del formulario de nueva bitácora
  const [newBitacoraData, setNewBitacoraData] = useState({
    desdeLas: '08:00',
    hastaLas: '17:00',
    actividadDesarrollada: '',
    actividadPendiente: '',
  });

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
    alert('¡Bitácora añadida con éxito!');
  };

  // Función para terminar la práctica
  const handleTerminarPractica = () => {
    setIndustrialPracticeStatus('completada'); // Cambiar el estado a "Completada"
    alert('¡Práctica finalizada con éxito!');
    // No redirigir, solo cambiar el estado en la misma página
  };

  return (
    <div className="text-left">
      {/* Pestañas de navegación */}
      <div className="flex space-x-4 border-b border-gray-700 mb-6">
        {['INFORMACIÓN', 'BITÁCORAS',
          industrialPracticeStatus === 'completada' && 'INFORME',
          industrialPracticeStatus === 'completada' && 'EVALUACIÓN',
          'LOGS', 'SOLICITUDES'
        ].filter(Boolean).map((tab) => ( // Filter out false values if tabs are not active
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`py-2 px-4 text-sm font-medium rounded-t-lg transition-colors duration-200
              ${activeTab === tab.toLowerCase() ? 'bg-orange-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === 'informacion' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]"> {/* Added min-h for consistent display */}
          {/* Columna izquierda: Detalles de la Práctica */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Práctica</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="text-gray-300"><span className="font-medium text-gray-100">Estado:</span> {industrialPracticeStatus === 'completada' ? 'Aprobado' : 'En Proceso'}</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Categoría:</span> Investigativa</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Modo:</span> 324 horas</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Progreso:</span> 226 Hr</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Inicio:</span> 1 de diciembre, 2024</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Término:</span> 6 de marzo 2025</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Empresa</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="text-gray-300"><span className="font-medium text-gray-100">Nombre:</span> Nombre apellido</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Dirección:</span> Av. España 1680</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">RUT:</span> 12.345.678-9</p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Supervisor</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="text-gray-300"><span className="font-medium text-gray-100">Nombre:</span> Nombre apellido</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Email:</span> correo@ejemplo.com</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Teléfono:</span> +56912345678</p>
            </div>
          </div>

          {/* Columna derecha: Información adicional */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Información</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300 text-center">
                {industrialPracticeStatus === 'completada' ? 'TU PRÁCTICA HA SIDO APROBADA EXITOSAMENTE.' : 'TU PRÁCTICA ESTÁ EN PROCESO. INGRESA TU BITÁCORA DIARIA.'}
              </p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Última bitácora</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="text-gray-300"><span className="font-medium text-gray-100">{latestBitacora.date}</span></p>
              <p className="text-gray-300">{latestBitacora.time}</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Actividad desarrollada:</span></p>
              <p className="text-gray-300 text-sm">{latestBitacora.developedActivity}</p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Actividad Pendiente:</span></p>
              <p className="text-gray-300 text-sm">{latestBitacora.pendingActivity}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bitácoras' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left min-h-[400px]"> {/* Added min-h for consistent display */}
          {/* Columna izquierda: Calendario y botones */}
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center text-white mb-4">
                <span className="font-semibold text-lg">2025</span>
              </div>
              <div className="flex justify-between items-center text-white mb-4">
                <button className="text-gray-400 hover:text-white"><ChevronDown size={20} className="rotate-90" /></button>
                <span className="font-semibold">vie, 23 may</span>
                <button className="text-gray-400 hover:text-white"><ChevronDown size={20} className="-rotate-90" /></button>
              </div>
              <div className="text-gray-400 text-center mb-2">mayo de 2025</div>
              <div className="grid grid-cols-7 gap-1 text-center text-gray-400 text-sm mb-4">
                <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-white">
                {/* Días del calendario */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <span key={day} className={`p-1 rounded-full ${day === 23 ? 'bg-orange-600' : ''} ${day === 20 || day === 24 || day === 27 || day === 30 ? 'text-green-400' : ''}`}>
                    {day}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowNewBitacoraForm(true)} // Muestra el formulario al hacer clic
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              AÑADIR BITÁCORA DEL DÍA
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
              DESCARGAR BITÁCORAS EN PDF
            </button>
          </div>

          {/* Columna derecha: Detalle de la bitácora o formulario de nueva bitácora */}
          {showNewBitacoraForm ? (
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
              <h3 className="text-xl font-semibold text-white mb-2">Bitácora {latestBitacora.date.split(',')[0]}, {latestBitacora.date.split(',')[1]}</h3>
              <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                <p className="text-gray-300">{latestBitacora.time}</p>
                <p className="text-gray-300"><span className="font-medium text-gray-100">Actividad desarrollada:</span></p>
                <p className="text-gray-300 text-sm">{latestBitacora.developedActivity}</p>
                <p className="text-gray-300"><span className="font-medium text-gray-100">Actividad Pendiente:</span></p>
                <p className="text-gray-300 text-sm">{latestBitacora.pendingActivity}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"><Edit size={20} /></button>
                  <button className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-gray-700"><Trash2 size={20} /></button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {industrialPracticeStatus === 'completada' && activeTab === 'informe' && (
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

      {industrialPracticeStatus === 'completada' && activeTab === 'evaluacion' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left min-h-[400px]"> {/* Added min-h for consistent display */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">Notas</h3>
            <div className="bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="text-gray-300"><span className="font-medium text-gray-100">Capacidad:</span></p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Confianza:</span></p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Aplicación o Empeño:</span></p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Adaptabilidad:</span></p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Iniciativa:</span></p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Aptitud para trabajar en equipo:</span></p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Conocimiento:</span></p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Asistencia y Puntualidad:</span></p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Logro de resultados:</span></p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Comunicación Efectiva:</span></p>
              <p className="text-gray-300"><span className="font-medium text-gray-100">Manejo de TIC:</span></p>
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

      {activeTab === 'logs' && (
        <div className="space-y-4 text-left min-h-[400px]"> {/* Added min-h for consistent display */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="bg-gray-800 p-3 rounded-lg mb-3">
              <p className="text-gray-300 text-sm">
                <span className="font-medium text-gray-100">Sistema:</span> La práctica fue ingresada correctamente (Estado: Esperando confirmación del supervisor)
              </p>
              <p className="text-gray-500 text-xs text-right">domingo, 28 de mayo, 2025 - 17:48</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg mb-3">
              <p className="text-gray-300 text-sm">
                <span className="font-medium text-gray-100">Sistema:</span> La práctica fue confirmada por tu Supervisor (Estado: En proceso)
              </p>
              <p className="text-gray-500 text-xs text-right">lunes, 29 de mayo, 2025 - 19:14</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-900 p-2 rounded-lg border border-gray-700">
            <input
              type="text"
              placeholder="Ingresa Mensaje"
              className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none p-2"
            />
            <button className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition-colors duration-200">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'solicitudes' && (
        <div className="text-center py-10 min-h-[400px]"> {/* Added min-h for consistent display */}
          <p className="text-gray-300 text-lg mb-8">
            En esta sección podrás hacer una solicitud para cambiar algún dato o configuración de tu práctica.
          </p>
          <img
            src="https://placehold.co/200x200/333333/FFFFFF?text=Sin+Solicitudes"
            alt="No hay solicitudes"
            className="mx-auto mb-8 rounded-full"
          />
          <p className="text-gray-400 mb-8">No has realizado ninguna solicitud</p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
            + AÑADIR SOLICITUD
          </button>
        </div>
      )}

      {/* Botones al final */}
      {industrialPracticeStatus === 'en_proceso' && ( // Only show TERMINAR PRÁCTICA if in_process
        <div className="flex justify-end items-center mt-6 pt-4 border-t border-gray-700">
          <button className="text-red-500 hover:text-red-700 mr-4 transition-colors duration-200">
            <Trash2 size={24} />
          </button>
          <button
            onClick={handleTerminarPractica} // Llama a la función para terminar la práctica
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            TERMINAR PRÁCTICA
          </button>
        </div>
      )}
    </div>
  );
};


// Componente de la página "Mis Prácticas"
const MyPracticesPage = ({ navigate, industrialPracticeStatus, setIndustrialPracticeStatus }) => { // Added setIndustrialPracticeStatus here
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Mis Prácticas</h2>

      <div className="space-y-4">
        {/* Práctica Industrial: ahora con estado "No iniciada", "En Proceso" o "Completada" */}
        <PracticeCard
          title="Práctica Industrial"
          status={
            industrialPracticeStatus === 'en_proceso'
              ? 'En Proceso'
              : industrialPracticeStatus === 'completada'
              ? 'Completada'
              : 'No iniciada'
          }
          statusColor={
            industrialPracticeStatus === 'en_proceso'
              ? 'text-yellow-400'
              : industrialPracticeStatus === 'completada'
              ? 'text-green-400'
              : 'text-red-400'
          }
        >
          {industrialPracticeStatus === 'en_proceso' || industrialPracticeStatus === 'completada' ? (
            <IndustrialPracticeDetails
              setIndustrialPracticeStatus={setIndustrialPracticeStatus}
              navigate={navigate}
              industrialPracticeStatus={industrialPracticeStatus} // Pass industrialPracticeStatus to details
            />
          ) : (
            <>
              <p className="text-gray-300 mb-4">
                Detalles de tu práctica industrial. Actualmente no hay un proceso activo.
              </p>
              <button
                onClick={() => navigate('enroll-practice')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
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

// Componente de la nueva página "Inscribir Práctica"
const EnrollPracticePage = ({ navigate, setIndustrialPracticeStatus }) => {
  const [currentStep, setCurrentStep] = useState(1); // Estado para controlar el paso actual (1: Tipo, 2: Categoría, etc.)
  const [practiceType, setPracticeType] = useState(null); // 'iniciar' o 'convalidar'
  const totalSteps = 4;
  const stepNames = ['Tipo', 'Categoría', 'Requisitos', 'Datos'];

  // Función para avanzar al siguiente paso
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Función para retroceder al paso anterior
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
    setPracticeType(type);
    handleNextStep();
  };

  // Función para finalizar la inscripción y cambiar el estado de la práctica
  const handleIngresarPractica = () => {
    setIndustrialPracticeStatus('en_proceso'); // Cambiar el estado de la práctica industrial a "En proceso"
    alert('¡Práctica modelada con éxito!'); // Mensaje de confirmación
    navigate('my-practices'); // Redirigir a la página "Mis Prácticas"
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Inscribir Práctica</h2>

      {/* Navegación por pasos */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-6">
        <div className="flex justify-around text-gray-400 font-semibold">
          {stepNames.map((stepName, index) => (
            <div
              key={stepName}
              className={`py-2 px-4 rounded-lg transition-colors duration-200 flex items-center
                ${currentStep === index + 1 ? 'text-orange-500' : 'text-gray-400'}
                ${currentStep > index + 1 ? 'text-green-500' : ''}`}
            >
              {currentStep > index + 1 ? (
                <CheckCircle size={20} className="mr-2" />
              ) : (
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2
                  ${currentStep === index + 1 ? 'border-orange-500' : 'border-gray-500'}
                  ${currentStep > index + 1 ? 'border-green-500' : 'border-gray-500'}
                `}>
                  {index + 1}
                </span>
              )}
              {stepName}
            </div>
          ))}
        </div>
      </div>

      {/* Contenido principal de la página de inscripción */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center">
        {currentStep === 1 && ( // Paso "Tipo"
          <>
            <p className="text-gray-300 text-lg mb-8">Escoge el tipo de práctica que quieres realizar</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Opción: Iniciar una práctica en una empresa o institución */}
              <div
                onClick={() => selectPracticeType('iniciar')}
                className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src="https://placehold.co/150x150/333333/FFFFFF?text=Iniciar+Pr%C3%A1ctica"
                  alt="Iniciar una práctica en una empresa o institución"
                  className="mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Iniciar una práctica en una empresa o institución</h3>
                <p className="text-gray-400 text-sm">
                  Busca y postula a ofertas de prácticas disponibles en diversas empresas.
                </p>
              </div>

              {/* Opción: Convalidar una práctica */}
              <div
                onClick={() => selectPracticeType('convalidar')}
                className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src="https://placehold.co/150x150/333333/FFFFFF?text=Convalidar+Pr%C3%A1ctica"
                  alt="Convalidar una práctica"
                  className="mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Convalidar una práctica</h3>
                <p className="text-gray-400 text-sm">
                  Presenta documentos para convalidar una práctica ya realizada.
                </p>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && practiceType === 'iniciar' && ( // Paso "Categoría" para Iniciar Práctica
          <>
            <p className="text-gray-300 text-lg mb-8">Escoge en que categoria estaria tu práctica</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Opción: Realizarás una práctica común en una empresa */}
              <div
                onClick={handleNextStep} // Al hacer clic, avanza a Requisitos
                className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src="https://placehold.co/150x150/333333/FFFFFF?text=Pr%C3%A1ctica+Com%C3%BAn"
                  alt="Realizarás una práctica común en una empresa"
                  className="mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Realizarás una práctica común en una empresa</h3>
                <p className="text-gray-400 text-sm">
                  Una práctica estándar enfocada en el desarrollo de habilidades profesionales.
                </p>
              </div>

              {/* Opción: Realizarás una práctica investigativa */}
              <div
                onClick={handleNextStep} // Al hacer clic, avanza a Requisitos
                className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src="https://placehold.co/150x150/333333/FFFFFF?text=Pr%C3%A1ctica+Investigativa"
                  alt="Realizarás una práctica investigativa"
                  className="mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Realizarás una práctica investigativa</h3>
                <p className="text-gray-400 text-sm">
                  Una práctica centrada en la investigación y el desarrollo de nuevos conocimientos.
                </p>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && practiceType === 'convalidar' && ( // Paso "Categoría" para Convalidar Práctica
          <>
            <p className="text-gray-300 text-lg mb-8">Escoge en que categoría estaria tu práctica</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Opción: Trabajo profesional realizado en una empresa o institución */}
              <div
                onClick={handleNextStep} // Al hacer clic, avanza a Requisitos
                className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src="https://placehold.co/150x150/333333/FFFFFF?text=Trabajo+Profesional"
                  alt="Trabajo profesional realizado en una empresa o institución"
                  className="mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Trabajo profesional realizado en una empresa o institución</h3>
              </div>

              {/* Opción: Es una práctica investigativa */}
              <div
                onClick={handleNextStep} // Al hacer clic, avanza a Requisitos
                className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src="https://placehold.co/150x150/333333/FFFFFF?text=Pr%C3%A1ctica+Investigativa"
                  alt="Es una práctica investigativa"
                  className="mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Es una práctica investigativa</h3>
              </div>

              {/* Opción: Trabajo Social */}
              <div
                onClick={handleNextStep} // Al hacer clic, avanza a Requisitos
                className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src="https://placehold.co/150x150/333333/FFFFFF?text=Trabajo+Social"
                  alt="Trabajo Social"
                  className="mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Trabajo Social</h3>
              </div>

              {/* Opción: Emprendimiento */}
              <div
                onClick={handleNextStep} // Al hacer clic, avanza a Requisitos
                className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src="https://placehold.co/150x150/333333/FFFFFF?text=Emprendimiento"
                  alt="Emprendimiento"
                  className="mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold text-white mb-2">Emprendimiento</h3>
              </div>
            </div>
          </>
        )}

        {currentStep === 3 && practiceType === 'iniciar' && ( // Paso "Requisitos" para Iniciar Práctica
          <>
            <p className="text-gray-300 text-lg mb-8">
              Para iniciar una práctica necesitas haberte contactado con una empresa y haber
              sido aceptado para realizar ahí tu práctica.
            </p>
            <p className="text-gray-300 text-lg mb-4">
              Una vez ya conseguida debes obtener los siguientes datos:
            </p>
            <ul className="text-gray-300 text-left list-disc list-inside space-y-2 mb-8">
              <li>Nombre, RUT y dirección de la empresa.</li>
              <li>Nombre, e-mail y telefono de contacto de alguna persona de la empresa la
                cual sera el supervisor o supervisora que valide que estarás realizando tu
                práctica alli y posteriormente evaluará tu desempeño
              </li>
            </ul>
          </>
        )}

        {currentStep === 3 && practiceType === 'convalidar' && ( // Paso "Requisitos" para Convalidar Práctica
          <>
            <p className="text-gray-300 text-lg mb-8">
              El trabajo tuvo que haber sido desarrollado en UNA sola empresa durante el triple del
              tiempo a convalidar.
            </p>
            <p className="text-gray-300 text-lg mb-4">
              Es necesario tener información de la empresa tal como Nombre, RUT y dirección.
            </p>
            <p className="text-gray-300 text-lg mb-4">
              Algunos documentos que debes tener a mano son:
            </p>
            <ul className="text-gray-300 text-left list-disc list-inside space-y-2 mb-8">
              <li>Certificado de imposiciones previsionales del tiempo que se trabajó, en caso de haber
                emitido boletas, presentar copia de estas en donde se observen los datos de la empresa
                en la cual trabajaste.
              </li>
              <li>Un Currículo que detalle las actividades realizadas en aquella empresa de no más de
                una pagina.
              </li>
              <li>Una carta de su Jefe o Supervisor directo en la Empresa en que éste avala la calidad del
                aporte realizado.
              </li>
            </ul>
          </>
        )}

        {currentStep === 4 && practiceType === 'iniciar' && ( // Paso "Datos" para Iniciar Práctica
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              {/* Datos de la Empresa */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-2">Datos de la Empresa</h3>
                <div className="bg-gray-900 p-4 rounded-lg flex items-center">
                  <Briefcase size={20} className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Empresa"
                    className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none"
                  />
                  <Plus size={20} className="text-orange-500 cursor-pointer hover:text-orange-400" />
                </div>
                <input
                  type="text"
                  placeholder="RUT de la Empresa"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                />
                <p className="text-gray-400 text-sm mt-4">
                  A continuación, enumera formalmente las tareas realizadas, estas mismas serán
                  enviadas a Dirección de Estudios para su aprobación.
                </p>

                <h3 className="text-xl font-semibold text-white mb-2 mt-6">Datos del Supervisor</h3>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                  maxLength="25"
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                  maxLength="25"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                  maxLength="50"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                  maxLength="10"
                />
              </div>

              {/* Datos de la práctica */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-2">Datos de la práctica</h3>
                <div className="bg-gray-900 p-4 rounded-lg flex items-center">
                  <Briefcase size={20} className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Modo de Práctica"
                    className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ChevronDown size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Ingeniería Civil Informática"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                />
                <input
                  type="text"
                  placeholder="Campus"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                />
                <input
                  type="date"
                  placeholder="Fecha de inicio"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                />

                <h3 className="text-xl font-semibold text-white mb-2 mt-6">Consideración especial (opcional)</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Si al momento de realizar la práctica tienes algún comentario respecto a alguna condición
                  a considerar, por favor indícanoslo aquí. (Ej: Situación financiera, estás diagnosticado con
                  TEA, entre otros...)
                </p>
                <textarea
                  placeholder="Consideración especial"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700 h-24 resize-none"
                ></textarea>
                <p className="text-gray-400 text-sm mt-2">
                  Esta información será totalmente confidencial y solamente el profesor y ayudante
                  encargados tendrán acceso.
                </p>
              </div>
            </div>
          </>
        )}

        {currentStep === 4 && practiceType === 'convalidar' && ( // Paso "Datos" para Convalidar Práctica
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              {/* Datos de la Empresa */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-2">Datos de la Empresa</h3>
                <div className="bg-gray-900 p-4 rounded-lg flex items-center">
                  <Briefcase size={20} className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Empresa"
                    className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none"
                  />
                  <Plus size={20} className="text-orange-500 cursor-pointer hover:text-orange-400" />
                </div>
                <input
                  type="text"
                  placeholder="RUT de la Empresa"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                />
                <p className="text-gray-400 text-sm mt-4">
                  A continuación, enumera formalmente las tareas realizadas, estas mismas serán
                  enviadas a Dirección de Estudios para su aprobación.
                </p>
                <textarea
                  placeholder="Resumen de las tareas realizadas"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700 h-24 resize-none"
                ></textarea>

                <h3 className="text-xl font-semibold text-white mb-2 mt-6">Datos del Alumno</h3>
                <p className="text-gray-400 text-sm mb-4">
                  A continuación sube tu currículum donde esté especificado el trabajo realizado, los boletos o
                  cotizaciones que generaste por este trabajo y una carta de un jefe o supervisor directo en la empresa
                  en la que valide la calidad de tu trabajo realizado.
                </p>
                <div className="bg-gray-900 p-4 rounded-lg flex items-center justify-between border border-gray-700">
                  <span className="text-gray-500">Currículum actualizado</span>
                  <Upload size={20} className="text-orange-500 cursor-pointer hover:text-orange-400" />
                </div>
                <div className="bg-gray-900 p-4 rounded-lg flex items-center justify-between border border-gray-700">
                  <span className="text-gray-500">Boletas emitidas o Certificado de Imposiciones previsionales</span>
                  <Upload size={20} className="text-orange-500 cursor-pointer hover:text-orange-400" />
                </div>
                <div className="bg-gray-900 p-4 rounded-lg flex items-center justify-between border border-gray-700">
                  <span className="text-gray-500">Carta de Jefe o Supervisor directo en la empresa</span>
                  <Upload size={20} className="text-orange-500 cursor-pointer hover:text-orange-400" />
                </div>
              </div>

              {/* Datos de la práctica */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-2">Datos de la práctica</h3>
                <div className="bg-gray-900 p-4 rounded-lg flex items-center">
                  <Briefcase size={20} className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Modo de Práctica"
                    className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ChevronDown size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Ingeniería Civil Informática"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                />
                <input
                  type="text"
                  placeholder="Campus"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                />
                <p className="text-gray-400 text-sm mt-4">
                  A continuación indicamos las fechas entre las cuales estuviste trabajando:
                </p>
                <input
                  type="date"
                  placeholder="Fecha de inicio"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                />
                <input
                  type="date"
                  placeholder="Fecha de término"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                />

                <h3 className="text-xl font-semibold text-white mb-2 mt-6">Consideración especial (opcional)</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Si al momento de realizar la práctica tienes algún comentario respecto a alguna condición
                  a considerar, por favor indícanoslo aquí. (Ej: Situación financiera, estás diagnosticado con
                  TEA, entre otros...)
                </p>
                <textarea
                  placeholder="Consideración especial"
                  className="w-full p-3 bg-gray-900 rounded-lg text-white placeholder-gray-500 focus:outline-none border border-gray-700 h-24 resize-none"
                ></textarea>
                <p className="text-gray-400 text-sm mt-2">
                  Esta información será totalmente confidencial y solamente el profesor y ayudante
                  encargados tendrán acceso.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Controles de navegación de pasos */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousStep}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          &lt; Atrás
        </button>

        {currentStep === 3 && ( // Botón Continuar solo en la sección de Requisitos
          <button
            onClick={handleNextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ml-auto"
          >
            Continuar &gt;
          </button>
        )}

        {currentStep === 4 && ( // Botón Ingresar Práctica en la sección de Datos
          <button
            onClick={handleIngresarPractica} // Llama a la nueva función
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ml-auto"
          >
            INGRESAR PRÁCTICA
          </button>
        )}
      </div>
    </div>
  );
};


// Componentes Placeholder para otras páginas
const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-300">Contenido para la sección de {title}. ¡Próximamente!</p>
    </div>
  </div>
);

// Componente de la página de Ofertas
const OffersPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Ofertas de Prácticas</h2>

      <div className="space-y-6">
        {/* Oferta 1 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
            <div className="flex items-center text-white">
              <Briefcase size={20} className="mr-2 text-gray-400" />
              <span className="font-semibold text-lg">Empresa: TS Latam SpA</span>
            </div>
            <div className="flex items-center text-white">
              <MapPin size={20} className="mr-2 text-gray-400" />
              <span className="text-lg">Ubicación: Santiago, Chile</span>
            </div>
            <div className="flex items-center text-white">
              <Mail size={20} className="mr-2 text-gray-400" />
              <span className="text-lg">Contacto: marcoignacio@tslatam.com</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Detalles:</h3>
          <p className="text-gray-300 mb-4">
            Empresa informática dedicada al desarrollo de aplicaciones web para la industria del turismo, ecommerce y pagos.
          </p>
          <p className="text-gray-500 text-sm text-right">miércoles, 8 de noviembre, 2023</p>
        </div>

        {/* Oferta 2 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
            <div className="flex items-center text-white">
              <Briefcase size={20} className="mr-2 text-gray-400" />
              <span className="font-semibold text-lg">Empresa: Heitmann Ingeniería y Asesoría Ltda</span>
            </div>
            <div className="flex items-center text-white">
              <MapPin size={20} className="mr-2 text-gray-400" />
              <span className="text-lg">Ubicación: Villa Alemana, Chile</span>
            </div>
            <div className="flex items-center text-white">
              <Mail size={20} className="mr-2 text-gray-400" />
              <span className="text-lg">Contacto: administracion@heitmann.cl</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Detalles:</h3>
          <p className="text-gray-300 mb-1">Práctica para técnico universitario electrónico</p>
          <p className="text-gray-300 mb-1">Número de cupos: 1</p>
          <p className="text-gray-300 mb-1">Horario: lunes a jueves, de 8.30 a 18.00, con 1 hora de colación, y los viernes de 7.30 a 17.00, con 1 hora de colación.</p>
          <p className="text-gray-300 mb-1">Pago práctica: 80.000 líquidos mensuales</p>
          <p className="text-gray-300 mb-4">Lugar de práctica: Ojos de Agua 219, Villa Alemana</p>
          <p className="text-gray-500 text-sm text-right">jueves, 12 de octubre, 2023</p>
        </div>
      </div>
    </div>
  );
};


// Componente principal de la aplicación
const App = () => {
  const [currentPage, setCurrentPage] = useState('my-practices'); // Página inicial: Mis Prácticas
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para el sidebar en móviles
  const [industrialPracticeStatus, setIndustrialPracticeStatus] = useState('no_iniciada'); // Nuevo estado para la práctica industrial

  const navigate = (page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false); // Cerrar sidebar al navegar
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Renderiza la página actual basada en el estado
  const renderPage = () => {
    switch (currentPage) {
      case 'my-practices':
        return <MyPracticesPage navigate={navigate} industrialPracticeStatus={industrialPracticeStatus} setIndustrialPracticeStatus={setIndustrialPracticeStatus} />;
      case 'enroll-practice':
        return <EnrollPracticePage navigate={navigate} setIndustrialPracticeStatus={setIndustrialPracticeStatus} />;
      case 'my-profile':
        return <PlaceholderPage title="Mi Perfil" />;
      case 'offers':
        return <OffersPage />; // Renderiza el nuevo componente OffersPage
      case 'companies':
        return <PlaceholderPage title="Empresas" />;
      case 'statistics':
        return <PlaceholderPage title="Estadísticas" />;
      case 'information':
        return <PlaceholderPage title="Informaciones" />;
      default:
        return <MyPracticesPage navigate={navigate} industrialPracticeStatus={industrialPracticeStatus} setIndustrialPracticeStatus={setIndustrialPracticeStatus} />;
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
          <div className="flex items-center text-white">
            <span className="font-semibold text-lg mr-2">RENATO RAMIREZ</span> {/* Nombre de usuario actualizado */}
            <ChevronDown size={20} />
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
};

export default App;
