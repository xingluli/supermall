import { debounce } from "./utils";
import BackTop from "components/content/backtop/BackTop";
export const itemImageMixin = {
  data() {
    return {
      refreshFunc: null
    };
  },
  mounted() {
    const newRefresh = debounce(this.$refs.scrollRef.refresh);
    this.refreshFunc = () => {
      newRefresh();
    };
    //第二个参数是一个对象，不能是新的函数
    this.$bus.$on("itemImageLoad", this.refreshFunc);
  }
};

export const backTopMixin = {
  data() {
    return {
      isShow: false
    };
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scrollRef.scrollTo(0, 0, 300);
    }
  }
};
