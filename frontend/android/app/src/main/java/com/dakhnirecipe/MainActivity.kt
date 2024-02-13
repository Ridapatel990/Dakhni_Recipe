package com.dakhnirecipe

import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "DakhniRecipe"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
 /** override fun createReactActivityDelegate(): ReactActivityDelegate =
    *  DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) 
      */

      
         override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Handle deep link
        handleDeepLink(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        // Handle deep link for new intents
        handleDeepLink(intent)
    }

    private fun handleDeepLink(intent: Intent?) {
        // Check if the intent contains a deep link
        if (intent != null && intent.data != null) {
            val action = intent.action
            // Ensure the action is VIEW (this is required for deep linking)
            if (Intent.ACTION_VIEW == action) {
                // Extract the deep link URL
                val deepLink = intent.data.toString()
                // Handle the deep link URL as needed
                // For example, navigate to the specified screen
                navigateToScreen(deepLink)
            }
        }
    }

    private fun navigateToScreen(deepLink: String) {
        // Handle navigation to the specified screen based on the deep link
        // You may use React Navigation or any other navigation library here
        // For example:
        // val intent = Intent(this, RecipeDescriptionActivity::class.java)
        // intent.putExtra("deepLink", deepLink)
        // startActivity(intent)
    }



}
