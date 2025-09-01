<template>
    <div>
        <el-container>
            <el-aside style="width: 200px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);">
                <Nav></Nav>
            </el-aside>
            <el-container>
                <el-main style="padding: 0;">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Nav from '@/components/Sidebar/Nav.vue';
export default {
    name: 'Admin',
    components : {
        Nav
    }
}
</script>

<style>

</style>