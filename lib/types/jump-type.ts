// 跳转类型
export enum JumpType {
  none = 0, // 无
  videoLabel = 1, // 视频标签
  video = 2, // 视频
}

// 跳转类型对应的中文标签
export const JumpTypeLabels: Record<JumpType, string> = {
  [JumpType.none]: '无',
  [JumpType.videoLabel]: '视频标签',
  [JumpType.video]: '视频',
};


// 视频标签： jumpData = 标签ID
export type JumpVideoLabelData = string;

// 视频： jumpData = 视频ID
export type JumpVideoData = string;