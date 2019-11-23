import Login from './components/pages/login/LoginPage.vue'
import Home from './components/pages/home/Home.vue'
import Materials from './components/pages/materials/Materials.vue'
import NewMaterial from './components/pages/materials/NewMaterial.vue'

//Telas referentes a Usuarios
import Usuarios from './components/pages/usuario/Usuarios.vue'
import NovoUsuario from './components/pages/usuario/NovoUsuario.vue'
import ConsultaUsuario from './components/pages/usuario/ConsultaUsuario.vue'
import SingleUserLogged from './components/pages/usuario/SingleUserLogged.vue'

//Telas referentes a Atividade
import Agenda from './components/pages/agenda/Agenda.vue'
import NovaAgenda from './components/pages/agenda/NovaAgenda.vue'
import ConsultaAgenda from './components/pages/agenda/ConsultaAgenda.vue'

//Tela referentes a Relatórios
import Relatorio from './components/pages/relatorio/Relatorio.vue'

export default [

    { path: '/login', name: 'loginGeneral', component: Login},

    { path: '/home', name: 'homePage', component: Home },

    { path: '/materials', name: 'materials', component: Materials },
    { path: '/materials/new', name: 'newMaterial', component: NewMaterial, beforeEnter: (to, from, next) => {
        if(localStorage.getItem('loggedAccess') == 'PROFESSOR') {
            next({name: 'homePage'})
        } else {
            next()
        }
    } },

    //Telas referente a Usuarios
    { path: '/usuario', name: 'usuario', component: Usuarios, beforeEnter: (to, from, next) => {
        if(localStorage.getItem('loggedAccess') == 'PROFESSOR' || localStorage.getItem('loggedAccess') == 'MONITOR') {
            next({name: 'homePage'})
        } else {
            next()
        }
    } },

    { path: '/usuario/novo', name: 'novoUsuario', component: NovoUsuario, beforeEnter: (to, from, next) => {
        if(localStorage.getItem('loggedAccess') == 'PROFESSOR' || localStorage.getItem('loggedAccess') == 'MONITOR') {
            next({name: 'homePage'})
        } else {
            next()
        }
    }  },
    { path: '/usuario/consulta', name: 'consultaUsuario', component: ConsultaUsuario,  beforeEnter: (to, from, next) => {
        if(localStorage.getItem('loggedAccess') == 'PROFESSOR' || localStorage.getItem('loggedAccess') == 'MONITOR') {
            next({name: 'homePage'})
        } else {
            next()
        }
    } },

    { path: '/userme/:id', name: 'meUser', component: SingleUserLogged, beforeEnter: (to, from, next) => {
        if(localStorage.getItem('loggedAccess') == 'PROFESSOR' || localStorage.getItem('loggedAccess') == 'MONITOR') {
            next({name: 'homePage'})
        } else {
            next()
        }
    }  },
    { path: '*', component: Home },

    //Telas referentes a Atividade
    { path: '/agenda', name: 'agenda', component: Agenda,},
    { path: '/agenda/nova', name: 'novaAgenda', component: NovaAgenda, beforeEnter: (to, from, next) => {
        if(localStorage.getItem('loggedAccess') == 'MONITOR') {
            next({name: 'homePage'})
        } else {
            next()
        }
    } },
    { path: '/agenda/consulta', name: 'consultaAgenda', component: ConsultaAgenda},

    //Tela referentes a Relatórios
    { path: '/relatorio', name: 'relatorio', component: Relatorio},

]