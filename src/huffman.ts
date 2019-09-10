import { isNull } from "util";
import PriorityQueue from "./priorityQueue";
import TreeNode from "./tree";

export default class HuffmanCompressor {
  /**
   * compress
   */
  public compress(text: string) {
    const pQueue = new PriorityQueue<TreeNode>();
    const freqs = new Map<string, number>();

    // Create Priority Queue of Tree Nodes
    for (const char of text) {
      if (!freqs.has(char)) {
        freqs.set(char, 1);
      } else {
        freqs.set(char, freqs.get(char) + 1);
      }
    }
    for (const [char, freq] of freqs) {
      const newNode = new TreeNode({char, freq});
      pQueue.enqueue(newNode, freq);
    }
    // console.log(pQueue.queue);

    // Create Huffman Tree
    while (pQueue.length() > 1) {
      const rightNode = pQueue.dequeue();
      const leftNode = pQueue.dequeue();
      const newFreq = leftNode.item.freq + rightNode.item.freq;
      const newNode = new TreeNode({char: null, freq: newFreq}, leftNode, rightNode);
      pQueue.enqueue(newNode, newFreq);
    }

    // Get root of Huffman Tree
    const root = pQueue.dequeue();

    // Build Huffman Codes
    const codes = this.parseHuffmanTree(root);
    console.log(codes);
  }

  private parseHuffmanTree(
    root: TreeNode,
    prefix: string = "",
    map: Map<string, string> = new Map(),
  ): Map<string, string> {
    const { item, left, right } = root;

    if (!isNull(item.char)) {
      map.set(item.char, prefix);
      console.log(item.char, prefix);
    }

    if (!isNull(left)) {
      this.parseHuffmanTree(left, prefix + "0", map);
    }

    if (!isNull(right)) {
      this.parseHuffmanTree(right, prefix + "1", map);
    }

    return map;
  }
}
