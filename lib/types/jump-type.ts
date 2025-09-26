// 跳转类型
export enum JumpType {
  none = 0, // 无
  videoLabel = 1, // 视频标签
  video = 2, // 视频
}

export const JumpTypeOptions = [
  { label: '无', value: JumpType.none },
  { label: '视频标签', value: JumpType.videoLabel },
  { label: '视频', value: JumpType.video },
];


// 视频标签： jumpData = 标签ID
export type JumpVideoLabelData = string;

// 视频： jumpData = 视频ID
export type JumpVideoData = string;