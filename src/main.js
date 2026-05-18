import {
  AUTH_EVENTS,
  AuthError,
  getSettings,
  getUser,
  handleAuthCallback,
  login,
  logout,
  oauthLogin,
  onAuthChange,
  signup,
} from "@netlify/identity";

const statusTitle = document.querySelector("#auth-status-title");
const statusText = document.querySelector("#auth-status-text");
const logoutButton = document.querySelector("#logout-button");
const githubButton = document.querySelector("#github-login");
const authTabs = document.querySelectorAll("[data-auth-mode]");
const authForms = document.querySelectorAll("[data-auth-form]");

const setStatus = (title, text, user = null) => {
  statusTitle.textContent = title;
  statusText.textContent = text;
  logoutButton.hidden = !user;
};

const describeUser = (user) => user?.user_metadata?.full_name || user?.email || "当前用户";

const showAuthMode = (mode) => {
  authTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.authMode === mode);
  });

  authForms.forEach((form) => {
    form.classList.toggle("is-active", form.dataset.authForm === mode);
  });
};

const reportAuthError = (error, fallback) => {
  if (error instanceof AuthError) {
    setStatus("操作失败", error.message);
    return;
  }

  setStatus("操作失败", fallback);
};

document.querySelectorAll(".media-frame img").forEach((image) => {
  const showPlaceholder = () => {
    image.closest(".media-frame").classList.add("is-missing");
    image.setAttribute("aria-hidden", "true");
  };

  image.addEventListener("error", showPlaceholder);

  if (image.complete && image.naturalWidth === 0) {
    showPlaceholder();
  }
});

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => showAuthMode(tab.dataset.authMode));
});

document.querySelector("#login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  setStatus("正在登录", "正在验证账号信息...");

  try {
    const user = await login(formData.get("email"), formData.get("password"));
    setStatus("登录成功", `欢迎回来，${describeUser(user)}。`, user);
    event.currentTarget.reset();
  } catch (error) {
    reportAuthError(error, "请检查邮箱和密码后再试一次。");
  }
});

document.querySelector("#signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  setStatus("正在创建账号", "正在提交注册信息...");

  try {
    const user = await signup(formData.get("email"), formData.get("password"), {
      full_name: formData.get("name"),
    });

    if (user.emailVerified) {
      setStatus("账号已创建", `欢迎，${describeUser(user)}。`, user);
    } else {
      setStatus("请查收邮件", "确认邮箱后即可完成注册。");
    }

    event.currentTarget.reset();
  } catch (error) {
    reportAuthError(error, "注册暂时没有完成，请稍后再试。");
  }
});

githubButton.addEventListener("click", () => {
  setStatus("跳转 GitHub", "正在打开 GitHub 授权页面...");
  oauthLogin("github");
});

logoutButton.addEventListener("click", async () => {
  await logout();
  setStatus("已退出登录", "可以继续浏览页面，或重新登录。");
});

onAuthChange((event, user) => {
  if (event === AUTH_EVENTS.LOGIN || event === AUTH_EVENTS.USER_UPDATED) {
    setStatus("已登录", `当前账号：${describeUser(user)}`, user);
  }

  if (event === AUTH_EVENTS.LOGOUT) {
    setStatus("尚未登录", "登录后可在这里看到当前账号状态。");
  }
});

const initializeAuth = async () => {
  try {
    const callback = await handleAuthCallback();

    if (callback?.type === "oauth" && callback.user) {
      setStatus("GitHub 登录成功", `当前账号：${describeUser(callback.user)}`, callback.user);
      history.replaceState(null, "", window.location.pathname + window.location.search);
      return;
    }

    if (callback?.type === "confirmation" && callback.user) {
      setStatus("邮箱已确认", `当前账号：${describeUser(callback.user)}`, callback.user);
      history.replaceState(null, "", window.location.pathname + window.location.search);
      return;
    }

    const user = await getUser();
    if (user) {
      setStatus("已登录", `当前账号：${describeUser(user)}`, user);
    }
  } catch (error) {
    reportAuthError(error, "身份验证回调处理失败。");
  }

  try {
    const settings = await getSettings();
    document.querySelector("[data-auth-mode='signup']").hidden = Boolean(settings.disableSignup);
  } catch {
    setStatus("等待部署配置", "Netlify Identity 需要部署到 Netlify 后完成连接。");
  }
};

initializeAuth();
