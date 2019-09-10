import { isNull } from "util";

interface ITree {
  item: any;
  left: ITree | null;
  right: ITree | null;
}

export default class TreeNode implements ITree {
  constructor(public item, public left = null, public right = null) {
    this.left = left;
    this.right = right;
  }

  /**
   * toString
   */
  public toObject(): object {
    const {item, left, right} = this;
    return {
      item,
      left: isNull(left) ? null : left.toObject(),
      right: isNull(right) ? null : right.toObject(),
    };
  }
}
