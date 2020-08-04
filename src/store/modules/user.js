
let userInfo = localStorage.getItem('userInfo');
const state = {
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    token: localStorage.getItem('token')
}

const mutations = {
    SET_TOKEN: (state, token) => {
        console.log(token)
        state.token = token;
        localStorage.setItem('token', token);
    },
    RESET_TOKEN: (state, token) => {
        state.token = ''
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
    },
    SET_USERINFO: (state, data) => {
        state.userInfo = data;
        localStorage.setItem('userInfo', JSON.stringify(data));

    }
}

const getters = {
}


const actions = {
    login({ commit }, userInfo) {
        const { phone, password } = userInfo;
        return new Promise((reslove, reject) => {
            $requestFormData('/user/login', { phone: phone.trim(), password }).then(res => {
                if (res.code === 200) {
                    commit('SET_TOKEN', res.data)
                    reslove();
                } else {
                    reject();
                }
            }).catch(err => {
                reject();
            })
        })

    },
    logout({ commit }, userInfo) {
            commit('RESET_TOKEN');
            vm.$router.replace('/login')
    },
    getUserInfo({ commit }) {
        return new Promise((reslove, reject) => {
            $requestFormData('/user/getUserInfo', {}).then(res => {
                if (res.code === 200) {
                    commit('SET_USERINFO', res.data)
                    reslove(res.data);
                } else {
                    reject();
                }
            }).catch(err => {
                reject();
            })
        })

    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}