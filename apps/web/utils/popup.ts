export function openCenteredOAuthPopup(
  authUrl: string | URL | undefined,
  width: number,
  height: number,
) {
  // 尝试获取屏幕宽度和高度（但注意这可能不可靠，特别是跨浏览器）
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;

  // 计算窗口的左和上位置以使其居中
  var left = screenWidth / 2 - width / 2;
  var top = screenHeight / 2 - height / 2;

  console.log(screenWidth, screenHeight);

  // 打开新窗口，并尝试设置位置和大小
  var popup = window.open(
    authUrl,
    "_blank",
    `width=${width},height=${height},left=${left},top=${top}`,
  );

  return popup;
}
