import Login from './components/pages/login/LoginPage.vue'
import Home from './components/pages/home/Home.vue'
import Materials from './components/pages/materials/Materials.vue'
import NewMaterial from './components/pages/materials/NewMaterial.vue'
import SingleMaterial from './components/pages/schedules/SingleSchedule.vue'
import Schedule from './components/pages/schedules/Schedule.vue'
import NewSchedule from './components/pages/schedules/NewSchedule.vue'
import SingleSchedule from './components/pages/schedules/SingleSchedule.vue'

//Telas referentes a Usuarios
import Usuarios from './components/pages/usuario/Usuarios.vue'
import NovoUsuario from './components/pages/usuario/NovoUsuario.vue'
import ConsultaUsuario from './components/pages/usuario/ConsultaUsuario.vue'
import SingleUser from './components/pages/usuario/SingleUser.vue'
import SingleUserLogged from './components/pages/usuario/SingleUserLogged.vue'

//Telas referentes a Atividade
import Agenda from './components/pages/agenda/Agenda.vue'
import NovaAgenda from './components/pages/agenda/NovaAgenda.vue'
import ConsultaAgenda from './components/pages/agenda/ConsultaAgenda.vue'

export default [

    { path: '/login', name: 'loginGeneral', component: Login },

    { path: '/home', name: 'homePage', component: Home },

    { path: '/materials', name: 'materials', component: Materials },
    { path: '/materials/new', name: 'newMaterial', component: NewMaterial },
    { path: '/materials/:id', name: 'materialId', component: SingleMaterial },

    { path: '/schedule', name: 'schedule', component: Schedule },
    { path: '/schedule/new', name: 'newschedule', component: NewSchedule },
    { path: '/schedule/:id', name: 'scheduleId', component: SingleSchedule },

    //Telas referente a Usuarios
    { path: '/usuario', name: 'usuario', component: Usuarios },
    { path: '/usuario/novo', name: 'novoUsuario', component: NovoUsuario },
    { path: '/usuario/consulta', name: 'consultaUsuario', component: ConsultaUsuario },
    { path: '/userme/:id', name: 'meUser', component: SingleUserLogged },
    { path: '/user/:id', name: 'userid', component: SingleUser },
    { path: '*', component: Home },

    //Telas referentes a Atividade
    { path: '/agenda', name: 'agenda', component: Agenda},
    { path: '/agenda/nova', name: 'novaAgenda', component: NovaAgenda},
    { path: '/agenda/consulta', name: 'consultaAgenda', component: ConsultaAgenda},

]