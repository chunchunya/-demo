<!--     权限校验组件---此处使用函数式组件     这里不适用template组件 -->
<script>
import {check} from '../utils/auth.js'
export default {
    functional: true,
    props: {
        authority:{
            type: Array,
            required: true   //必须传递的一个属性
        }
    },
    render(h, context){
        const {props,scopedSlots} = context
        return check(props.authority) ? scopedSlots.default() : null
    }

}
</script>
