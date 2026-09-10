// 通用文件网格卡片内容组件 — 网格视图 (大图标 + 文件名 + 项数/大小)

import { VStack, Text, Image, ZStack, Spacer } from "scripting";
import { fmtSize, FileInfo } from "../manager/utils";
import { FolderCountLabel, FolderCountStore } from "./FolderCountLabel";

export interface FileGridContentProps {
  file: FileInfo;
  folderCountStore?: FolderCountStore;
  /** 选择模式配置（可选） */
  selectMode?: {
    isSelected: boolean;
    onToggle: () => void;
  };
  /** 拖放悬停到文件夹：图标右上角显示绿色 + 徽标*/
  isDropTargeted?: boolean;
}

/** 网格项展示：顶部居中大图标，中间文件名（最多2行），底部信息 */
export function FileGridContent({ file, folderCountStore, selectMode, isDropTargeted }: FileGridContentProps) {
  return (
    <VStack
      alignment="center"
      spacing={6}
      frame={{ maxWidth: "infinity", minHeight: 110, maxHeight: 125 }}
      contentShape="rect"
    >
      {/* 图标区域：如果处于选择模式，展示带勾选圈的大图标效果 */}
      <ZStack alignment="topTrailing" frame={{ height: 52 }}>
        <VStack alignment="center" frame={{ width: 64, height: 52 }}>
          <Image
            systemName={file.icon}
            font="largeTitle"
            foregroundStyle={file.iconColor}
          />
        </VStack>
        {selectMode ? (
          <Image
            systemName={selectMode.isSelected ? "checkmark.circle.fill" : "circle"}
            foregroundStyle={selectMode.isSelected ? "systemBlue" : "secondaryLabel"}
            font="subheadline"
          />
        ) : null}
        {isDropTargeted ? (
          <Image
            systemName="plus.circle.fill"
            foregroundStyle="systemGreen"
            font="title3"
          />
        ) : null}
      </ZStack>

      {/* 文件名（居中，最多 2 行，文字截断，高仿系统文件网格） */}
      <Text
        font="footnote"
        lineLimit={2}
        multilineTextAlignment="center"
        foregroundStyle="label"
      >
        {file.name}
      </Text>

      {/* 底部详细信息：文件夹项数 或 文件大小 */}
      <VStack alignment="center">
        {file.isDirectory ? (
          folderCountStore ? (
            <FolderCountLabel path={file.path} store={folderCountStore} />
          ) : (
            <Text font="caption2" monospaced lineLimit={1} foregroundStyle="secondaryLabel">
              文件夹
            </Text>
          )
        ) : (
          <Text font="caption2" monospaced lineLimit={1} foregroundStyle="secondaryLabel">
            {fmtSize(file.size)}
          </Text>
        )}
      </VStack>
    </VStack>
  );
}
