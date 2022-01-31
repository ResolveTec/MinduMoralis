<template>
<div class="row q-pa-lg justify-center items-center">
    <div class="row loginCard justify-center items-center">
        <q-card :flat="true" class="full-width justify-center items-center transpBackground">
            <q-card-section class="row q-pb-sm justify-center items-center">
                <div class="row self-center q-pb-lg">
					<img src="~assets/logo-mindu.svg" width="144" height="144" />
				</div>
                <div class="row text-h5">
					Are you sure to Logout MINDU?
                </div>
            </q-card-section>

            <q-form>
                <div class="justify-center items-center">
                    <div class="row text-grey-8 text-weight-thin text-center">
                        <q-card-actions class="q-px-lg full-width justify-center items-center">
                            <q-btn rounded size="lg" class="text-white text-lowercase regularButton" padding="sm lg" label="Logout" @click="doLogout()" />
                        </q-card-actions>
                    </div>
                </div>
            </q-form>
        </q-card>
    </div>
</div>
</template>

<script>
export default {
    name: "UserActionLogout",
    
    methods: {
        doLogout() {
            this.$moralis.User.logOut().then(() => {
                const currentUser = this.$moralis.User.current();  // this will now be null
                if (currentUser == null) {
                    this.$router.push("/");
                }
			});
        }
    }
};
</script>
