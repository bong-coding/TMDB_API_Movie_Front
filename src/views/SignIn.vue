<template>
  <div class="signin-container">
    <transition name="fade" mode="out-in">
      <div
        class="form-container"
        v-if="showForm"
        :key="isSignIn ? 'sign-in' : 'sign-up'"
      >
        <h2>{{ isSignIn ? "Sign In" : "Sign Up" }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <input
              placeholder="Email"
              type="email"
              id="email"
              v-model="email"
              @blur="validateEmail"
              required
            />
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </div>
          <div class="input-group">
            <input
              placeholder="Password"
              type="password"
              id="password"
              v-model="password"
              required
            />
          </div>
          <div v-if="!isSignIn" class="input-group">
            <input
              placeholder="Confirm Password"
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              @blur="validatePassword"
              required
            />
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>
          <div class="checkbox-group" v-if="!isSignIn">
            <input type="checkbox" id="terms" v-model="terms" required />
            <label for="terms">I have read Terms and Conditions</label>
          </div>
          <div class="checkbox-group" v-if="isSignIn">
            <input type="checkbox" id="rememberMe" v-model="rememberMe" />
            <label for="rememberMe">Remember me</label>
          </div>
          <button type="submit">{{ isSignIn ? "Sign In" : "Sign Up" }}</button>
        </form>
        <p>
          <span>
            {{
              isSignIn ? "Don’t have an account?" : "Already have an account?"
            }}
            <button @click="toggleForm">
              {{ isSignIn ? "Sign Up" : "Sign In" }}
            </button>
          </span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toastification";
import { tryLogin, tryRegister } from "../utils/auth";

export default {
  name: "SignIn",
  data() {
    return {
      isSignIn: true,
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
      terms: false,
      emailError: "",
      passwordError: "",
      showForm: false, // 폼 표시 여부를 위한 데이터 추가
    };
  },
  mounted() {
    this.showForm = true;
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    toggleForm() {
      this.isSignIn = !this.isSignIn;
      this.resetForm();
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.emailError = "이메일 형식이 아닙니다.";
      } else {
        this.emailError = "";
      }
    },
    validatePassword() {
      if (this.password !== this.confirmPassword) {
        this.passwordError = "비밀번호가 일치하지 않습니다.";
      } else {
        this.passwordError = "";
      }
    },
    handleSubmit() {
      if (!this.isSignIn) {
        this.validateEmail();
        this.validatePassword();
        if (this.emailError || this.passwordError || !this.terms) {
          this.toast.error("이미 존재하는 아이디입니다.");
          return;
        }
      }

      if (this.isSignIn) {
        tryLogin(
          this.email,
          this.password,
          (user) => {
            this.login({ user, rememberMe: this.rememberMe });
            this.toast.success("로그인 성공!");
            this.$router.push("/");
          },
          () => {
            this.toast.error("아이디나 비밀번호가 틀렸습니다.");
          }
        );
      } else {
        tryRegister(
          this.email,
          this.password,
          () => {
            this.toast.success("회원가입을 성공하였습니다. 로그인 해주세요.");
            this.isSignIn = true;
            this.resetForm();
          },
          () => {
            this.toast.error("이미 사용중인 이메일입니다.");
          }
        );
      }
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.rememberMe = false;
      this.terms = false;
      this.emailError = "";
      this.passwordError = "";
    },
  },
};
</script>

<style scoped>
.signin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #1c1c1c;
}

.form-container {
  width: 400px;
  padding: 30px;
  border: 1px solid #45f3ff;
  border-radius: 8px;
  background-color: #23242a;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  color: #45f3ff;
}

.input-group {
  margin-bottom: 20px;
  position: relative;
}

.input-group input {
  width: 100%;
  padding: 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #45f3ff;
  color: #fff;
  outline: none;
  font-size: 1em;
  transition: border-color 0.3s;
}

.input-group input::placeholder {
  color: #808080;
}

.input-group input:focus {
  border-bottom: 1px solid #45f3ff;
  box-shadow: 0 1px 8px rgba(69, 243, 255, 0.3);
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #45f3ff;
}

.checkbox-group input {
  margin-right: 10px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #45f3ff;
  border: none;
  color: black;
  cursor: pointer;
  border-radius: 4px;
  font-size: 20px;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #45f3ff;
  transform: scale(1.05);
}

.error {
  color: red;
  font-size: 0.9em;
}

p {
  text-align: center;
  margin-top: 15px;
  color: #45f3ff;
}

p button {
  background: none;
  border: none;
  color: #45f3ff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
