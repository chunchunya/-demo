<template>
 <div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <todo-top @addTodo="addTodo"></todo-top>
      <List :todos="todos"></List>
      <todo-down :todos="todos" @checkAllTodo="checkAllTodo" @clearAllTodo="clearAllTodo"></todo-down>
    </div>
  </div>
 </div>
</template>

<script>
import TodoTop from './TodoTop.vue';
import TodoDown from './TodoDown.vue';
import List from './List.vue';
export default {
    name: 'TodoList',
    components: {TodoTop,TodoDown,List},
    data(){
        return{
            // todos:[
            //     {id:'001',title:'学习',done:true},
            //     {id:'002',title:'吃饭',done:false},
            //     {id:'003',title:'复习',done:true},
            //     {id:'004',title:'聚餐',done:true},
            //     {id:'005',title:'上班',done:true},
            //     {id:'006',title:'玩儿',done:true},
            //     {id:'007',title:'喝儿',done:true},
            //     {id:'008',title:'蹦迪',done:true},
            //     {id:'009',title:'考试',done:false},
            //     {id:'010',title:'玩儿',done:true}
            // ],
            //从本地浏览器存储中获取数据，因为一开始没有，所以就是空，所以这里不现实了
            todos:JSON.parse(localStorage.getItem('todos')) || []
        }
    },
    methods: {
        // 添加一个todo对象
        addTodo(todoObj){
            console.log(todoObj);
            this.todos.unshift(todoObj);
        },
        // 勾选or取消勾选一个todo
        checkTodo(id){
            this.todos.forEach(function(todo){
                if(todo.id == id){
                    todo.done = !todo.done
                }
            })
            console.log(this.todos);
        },
        //删除一个todo
        deleteTodo(id){
            this.todos = this.todos.filter((todo)=>{
                return todo.id !==id;
            })
            
        },
        //全选or取消全选
        checkAllTodo(done){
            this.todos.forEach((todo)=>{
                todo.done = done
            })
        },
        //清除所有已经完成的todo
        clearAllTodo(){
            this.todos = this.todos.filter((todo)=>{
                return !todo.done;
            })
        }
    },
    //将数据进行浏览器本地存储
    watch:{
        todos(value){
            localStorage.setItem('todos',JSON.stringify(value));

        }
    },
    mounted(){
        console.log(this.todos);
        this.$bus.$on('deleteTodo',this.deleteTodo);
        this.$bus.$on('checkTodo',this.checkTodo);
    },
    //关闭事件总线
    beforeDestory(){
        this.$bus.$off('deleteTodo');
        this.$bus.$off('checkTodo');
    }

}
</script>

<style>
/*base*/
    body {
        background: #fff;
    }

    .btn {
        display: inline-block;
        padding: 4px 12px;
        margin-bottom: 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }

    .btn-danger {
        color: #fff;
        background-color: #da4f49;
        border: 1px solid #bd362f;
    }

    .btn-danger:hover {
        color: #fff;
        background-color: #bd362f;
    }

    .btn:focus {
        outline: none;
    }

    .todo-container {
        width: 800px;
        margin: 0 auto;
    }
    .todo-container .todo-wrap {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>