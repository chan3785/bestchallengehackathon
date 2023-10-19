using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;

public class Setting : MonoBehaviour
{
    public static bool isBGM, isSound, isStory, isVib, isTutorial = true;
    [SerializeField] Toggle bgmTog, soundTog, storyTog, vibTog, tutTog;
    [SerializeField] AudioSource bgm, sound;


    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        setAudioToggle(bgmTog, bgm, isBGM);
        setAudioToggle(soundTog, sound, isSound);
        setToggle(vibTog, isVib);
        setToggle(storyTog, isStory);
    }

    // 게임 상태를 저장하는 함수
    public void SaveGame()
    {
        // 여기에 저장할 정보를 넣으면 됩니다.
        /*
        PlayerPrefs.SetInt("PlayerScore", playerScore);
        PlayerPrefs.SetInt("PlayerLevel", playerLevel);

        PlayerPrefs.Save();

        Debug.Log("게임 상태가 저장되었습니다.");
        */
    }
    public void setAudioToggle(Toggle toggle, AudioSource audioSource, bool isActive)
    {
        if (toggle.isOn)
        {
            audioSource.mute = false;
            isActive = true;
        }
        else
        {
            audioSource.mute = true;
            isActive = false;
        }

    }
    public void setToggle(Toggle toggle, bool isActive)
    {
        if (toggle.isOn)
        {
            Debug.Log("true");
            isActive = true;
        }
        else
        {
            Debug.Log("false");
            isActive = false;
        }

    }
}

