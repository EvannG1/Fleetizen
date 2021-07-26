<template>
    <div>
        <footer class="footer">
            <div class="container text-center">
                <span class="text-muted">
                    <router-link id="copyright" to="/">Fleetizen</router-link> © 2021 - Star Citizen is a product of Cloud Imperium Rights LLC and Cloud Imperium Rights Ltd.
                </span>
            </div>
        </footer>
    </div>
</template>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}

body {
  margin-bottom: 60px;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
}

#copyright {
    text-decoration: none;
}
</style>