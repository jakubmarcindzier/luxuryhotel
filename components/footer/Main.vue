<template>
	<footer id="footer" class="uk-margin-large-top uk-position-relative">
		<div class="uk-position-relative uk-position-z-index">
			<div class="footer-content color-dark-gray uk-container uk-container-large uk-margin-medium-top uk-margin-medium-bottom">
				<div class="uk-grid" uk-grid>
					<div class="uk-width-4-5@m">
						<div class="footer-block">
							<h6>Most Popular Destinations</h6>
							<LazyDestinationsList area="footer" />
						</div>
					</div>

					<div class="uk-width-1-5@m">
						<div class="footer-block">
							<h6>Quick Links</h6>
							<ul class="footer-content-links fs-xs uk-grid-small uk-child-width-1-1" uk-grid>
								<li v-for="(menu, index) in options.footer_menu.menu_items" :key="index">
									<NuxtLink activeClass="activeLink" :to="menu.link" :target="menu.target" :prefetch="false" class="use-transition" :uk-toggle="menu.type == 'settings' ? 'target: #offcanvas-settings' : null">
										{{menu.title}}
									</NuxtLink>
								</li>
							</ul>
						</div>

						<div class="footer-block">
							<h6>About Us</h6>
							<div v-if="options.footer_about" v-html="options.footer_about" class="footer-content-info fs-xs"></div>
							<LazySocialNetworks class="footer-content-socials" />
						</div>
					</div>
				</div>
			</div>

			<nuxt-img placeholder class="footer-content-logo uk-align-center" width="60" height="60" src="/img/lh.svg" loading="lazy" alt="LuxuryHotel - 5 Star Hotel Reviews" />

			<div class="footer-bottom uk-text-center">
				<p class="footer-copyright color-dark-gray fw-light fs-xs uk-margin-remove">
					© {{year}} LuxuryHotel. {{options.footer_copyright}}
				</p>
			</div>
		</div>

		<nuxt-img placeholder class="footer-background uk-position-absolute uk-position-center" src="/img/footer-bgr.svg" loading="lazy" alt="LuxuryHotel - Luxury Hotel Reviews" />
	</footer>
</template>

<script setup>

	// Get the current year
	const year = new Date().getFullYear();

	// Get started
  const { getItems } = useDirectusItems();

  // Get all the hotels
  const options = await getItems({
    collection: 'options',
    params: {
      fields: ['footer_menu.menu_items', 'footer_about', 'footer_copyright'],
      limit: -1
    }
  });

</script>

<style>
	#footer {
		background-color: var(--light);
		border-top: 3px solid var(--light-gray);
	}
	.footer-bottom {
		padding: 30px;
		border-top: 2px solid var(--light-gray);
	}
	.footer-content-links li a {
		color: var(--dark-gray);
	}
	.footer-content-links li a:hover {
		color: var(--black);
	}
	.footer-content-socials {
		gap: 30px;
	}
	.footer-content-logo {
		margin-top: 20px;
	}
	.footer-block:not(:last-child) {
		margin-bottom: 30px;
	}
	.footer-block h6 {
		font-size: var(--font-size-s);
		font-weight: 600;
	}
	.footer-background {
    object-fit: cover;
    width: 100%;
    height: 100%;
		z-index: 0;
	}
	@media only screen and (max-width: 600px) {
		.footer-bottom {
			padding: 20px;
		}
	}
</style>