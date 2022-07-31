import { Root, Source } from "@/root";
import { Vue } from "vue-class-component";

export default class BrowserBase extends Vue {
  public get currentSource(): Source {
    return Root.getInstance().currentSource as Source;
  }
  //
  public get root(): Root {
    return Root.getInstance();
  }
}
