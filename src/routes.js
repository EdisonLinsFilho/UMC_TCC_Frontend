import Login from './components/pages/login/LoginPage.vue'
import Home from './components/pages/home/Home.vue'
import Materials from './components/pages/materials/Materials.vue'
import NewMaterial from './components/pages/materials/NewMaterial.vue'
import SingleMaterial from './components/pages/schedules/SingleSchedule.vue'
import Schedule from './components/pages/schedules/Schedule.vue'
import NewSchedule from './components/pages/schedules/NewSchedule.vue'
import SingleSchedule from './components/pages/schedules/SingleSchedule.vue'
import Users from './components/pages/users/Users.vue'
import NewUser from './components/pages/users/NewUser.vue'
import SingleUser from './components/pages/users/SingleUser.vue'
import SingleUserLogged from './components/pages/users/SingleUserLogged.vue'

export default [
    { path: '/login', name: 'loginGeneral', component: Login },

    { path: '/home', name: 'homePage', component: Home },

    { path: '/materials', name: 'materials', component: Materials },
    { path: '/materials/new', name: 'newMaterial', component: NewMaterial },
    { path: '/materials/:id', name: 'materialId', component: SingleMaterial },

    { path: '/schedule', name: 'schedule', component: Schedule },
    { path: '/schedule/new', name: 'newschedule', component: NewSchedule },
    { path: '/schedule/:id', name: 'scheduleId', component: SingleSchedule },

    { path: '/users', name: 'users', component: Users },
    { path: '/users/new', name: 'newUser', component: NewUser },
    { path: '/userme/:id', name: 'meUser', component: SingleUserLogged },
    { path: '/user/:id', name: 'userid', component: SingleUser },
    { path: '*', component: Home },
]