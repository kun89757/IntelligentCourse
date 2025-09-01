<template>
    <div id="container">
        <el-header id="header">
            <img src="../assets/logo.png" id="logo" @click="toHome" alt="">
            <el-button v-show="isLogin" type="text" id="course-btn" @click="toCourseList">课程</el-button>
            <el-button v-show="isLogin" type="text" id="concept-btn" @click="toConceptList">课程概念</el-button>
            <!-- <div id="search">
                <el-input placeholder="请输入内容" v-model="content" clearable id="search-bar">
                    <el-button slot="append" icon="el-icon-search" @click="getCourseList" id="search-btn"></el-button>
                </el-input>
            </div> -->
            <el-dropdown id="avatar">
                <el-avatar :src="avatar"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toProfile" v-show="isLogin">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="toHistory" v-show="isLogin">我的课程</el-dropdown-item>
                    <el-dropdown-item @click.native="logout" v-show="isLogin">登出</el-dropdown-item>
                    <el-dropdown-item @click.native="login" v-show="!isLogin">登陆</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button id="user-btn" v-if="!isLogin" @click="login">点此登录</el-button>
            <el-button id="user-btn" v-if="isLogin" @click="toProfile">个人中心</el-button>
        </el-header>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data: function() {
        return {
          isLogin: false,
          email: '',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          username: '',
          nickname: '',
          roleId: -1,
          content: '',
          userId: -1,
        }
    },
    created() {
        this.judgeLogin();
        this.render();
        setInterval(() => this.judgeLogin(), 30000);
    },
    methods: {
        getCourseList() {
            if (this.content === '') {
                return;
            }
            const key = this.content;
            this.$router.push({ path: '/courseList/:key', query: { key: key }});
            this.content = '';
        },
        toCourseList() {
            this.$router.push({ path: '/courseList/:key', query: { key: '' }});
        },
        toConceptList() {
            this.$router.push('/conceptCourseList');
        },
        toHome() {
            this.$router.push('/');
        },
        getUserInfo() {
            this.$store.dispatch('user/getUserInfo', localStorage.getItem('token'))
            .then((response) => {
                console.log(response);
                if (response.code === 200) {
                    this.email = response.data.email;
                    this.avatar = response.data.avatarURL;
                    this.username = response.data.username;
                    this.userId = response.data.userId;
                    this.nickname = response.data.nickname;
                    this.roleId = localStorage.getItem('roleId');
                    this.$store.commit('user/setEmail', this.email);
                    this.$store.commit('user/setAvatar', this.avatarURL);
                    this.$store.commit('user/setUsername', this.username);
                    this.$store.commit('user/setUserId', this.userId);
                } else if (response.code === 500201){
                    this.$message.error(response.message);
                    this.logout();
                }
            }).catch(error => {
                console.log(error);
            }) 
        },
        judgeLogin() {
            if (localStorage.getItem("token")) {
                this.isLogin = true;
                this.getUserInfo();
                } else {
                    this.isLogin = false;
                }
        },
        render() {
            if (this.isLogin) {
                this.avatar = this.$store.state.avatar;
            }
        },
        toProfile() {
            this.$router.push('/profile');
        },
        logout() {
            this.$store.dispatch('login/logout')
            .then(response => {
                if (response.code === 200) {
                    console.log(response);
                } else {
                    this.$message.error(response.message);
                }
            }).catch(error => {
                console.log(error);
            })
            localStorage.clear();
            this.$router.go(0);
        },
        login() {
            this.$router.push('/login');
        },
        toHistory() {
            this.$router.push('/historyCourse');
        }
    }
}

</script>

<style>
#header {
    display: flex;
    opacity: 1;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid rgba(199, 201, 201, 1);            
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
}

#logo {
    margin-left: 20%;
    margin-right: 5%;
    opacity: 1;
}

#course-btn {
    -webkit-text-fill-color: black;
    font-size: large;
}

#concept-btn {
    -webkit-text-fill-color: black;
    font-size: large;
    margin-right: 18%;
}

#search {
    margin-right: 2%;
}

#avatar {
    margin-right: 2%;
    position: absolute;
    right: 25%;
}

#user-btn {
    background: rgba(222, 71, 71, 1);
    -webkit-text-fill-color: white;
    position: absolute;
    right: 20%;
}

#logo:hover {
    cursor: pointer;
}
</style>