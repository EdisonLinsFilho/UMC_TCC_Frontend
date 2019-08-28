import Login from './components/pages/login/LoginPage.vue'
import Home from './components/pages/home/HomePm.vue'
import Clients from './components/pages/clients/Clients.vue'
import NewClient from './components/pages/clients/NewClient.vue'
import SingleClient from './components/pages/clients/SingleClient.vue'
import Agenda from './components/pages/projects/Agenda.vue'
import NewProject from './components/pages/projects/NewProject.vue'
import SingleProject from './components/pages/projects/SingleProject.vue'
import Users from './components/pages/users/Users.vue'
import NewUser from './components/pages/users/NewUser.vue'
import SingleUser from './components/pages/users/SingleUser.vue'
import SingleUserLogged from './components/pages/users/SingleUserLogged.vue'

export default [
    { path: '/login', name: 'loginGeneral', component: Login },

    { path: '/home', name: 'homePage', component: Home },

    { path: '/clients', name: 'clients', component: Clients },
    { path: '/clients/new', name: 'newClient', component: NewClient },
    { path: '/client/:id', name: 'clientid', component: SingleClient },

    { path: '/agenda', name: 'agenda', component: Agenda },
    { path: '/projects/new', name: 'newProject', component: NewProject },
    { path: '/project/:id', name: 'projectid', component: SingleProject },

    { path: '/users', name: 'users', component: Users },
    { path: '/users/new', name: 'newUser', component: NewUser },
    { path: '/userme/:id', name: 'meUser', component: SingleUserLogged },
    { path: '/user/:id', name: 'userid', component: SingleUser },
    { path: '*', component: Home },
]